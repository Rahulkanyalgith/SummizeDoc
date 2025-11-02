import { pricingPlans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";
import { User } from "@clerk/nextjs/server";

// Accepts either email or userId
export async function getPriceIdForActiveUser(identifier: string) {
  const sql = await getDbConnection();

  // Try by email first
  let query =
    await sql`SELECT price_id FROM users WHERE email = ${identifier} AND status = 'active'`;
  if (!query?.[0]) {
    // Try by userId
    query =
      await sql`SELECT price_id FROM users WHERE id = ${identifier} AND status = 'active'`;
  }
  return query?.[0]?.price_id || null;
}

export async function hasActivePlan(emailOrId: string) {
  const sql = await getDbConnection();

  // Check if user has a paid plan by email
  let query =
    await sql`SELECT price_id,status FROM users WHERE email = ${emailOrId} AND status = 'active' AND price_id IS NOT NULL`;

  if (query && query.length > 0) {
    return true;
  }

  // Check if user is on Free plan (active, price_id is NULL) by email
  let freeQuery =
    await sql`SELECT id FROM users WHERE email = ${emailOrId} AND status = 'active' AND price_id IS NULL`;
  if (freeQuery && freeQuery.length > 0) {
    return true;
  }

  // Fallback: check by userId
  query =
    await sql`SELECT price_id,status FROM users WHERE id = ${emailOrId} AND status = 'active' AND price_id IS NOT NULL`;
  if (query && query.length > 0) {
    return true;
  }
  freeQuery =
    await sql`SELECT id FROM users WHERE id = ${emailOrId} AND status = 'active' AND price_id IS NULL`;
  if (freeQuery && freeQuery.length > 0) {
    return true;
  }

  return false;
}

export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUserUploadCount(userId);
  const priceId = await getPriceIdForActiveUser(userId);

  let planId = "free";
  if (priceId) {
    const plan = pricingPlans.find((plan) => plan.priceId === priceId);
    if (plan) {
      planId = plan.id;
    }
  }

  let uploadLimit: number;
  if (planId === "pro") {
    uploadLimit = 1000; // effectively unlimited
  } else if (planId === "basic") {
    uploadLimit = 5;
  } else {
    uploadLimit = 2; // Free plan
  }

  return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit };
}

// Resolve the effective user id stored in DB for a given Clerk user.
// If a row exists for the user's email, return that row's id. Otherwise, fall back to Clerk's user.id
export async function getEffectiveUserId(user: User) {
  const sql = await getDbConnection();
  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) return user.id;
  try {
    const rows = await sql`SELECT id FROM users WHERE email = ${email} AND status = 'active'`;
    if (rows && rows[0]?.id) {
      return rows[0].id as string;
    }
  } catch (err) {
    console.error("getEffectiveUserId error", err);
  }
  return user.id;
}

export async function getSubscriptionStatus(user: User) {
  const hasSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress,
  );
  return hasSubscription;
}
