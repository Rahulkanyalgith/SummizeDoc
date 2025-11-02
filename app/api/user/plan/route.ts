import { NextRequest, NextResponse } from "next/server";
import { getPriceIdForActiveUser } from "@/lib/user";
import { pricingPlans } from "@/utils/constants";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Get the user's price ID from the database
    const priceId = await getPriceIdForActiveUser(email);

    // Determine the plan ID
    let planId = "free"; // Default to free
    if (priceId) {
      const plan = pricingPlans.find((plan) => plan.priceId === priceId);
      if (plan) {
        planId = plan.id;
      }
    }

    return NextResponse.json({ planId });
  } catch (error) {
    console.error("Error getting user plan:", error);
    return NextResponse.json(
      { error: "Failed to get user plan" },
      { status: 500 },
    );
  }
}
