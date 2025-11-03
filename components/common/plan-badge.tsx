import { getPriceIdForActiveUser } from "@/lib/user";
import { pricingPlans } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

export default async function PlanBadge() {
  const user = await currentUser();

  if (!user?.id) return null;

  const email = user.emailAddresses?.[0]?.emailAddress;

  let priceId: string | null = null;
  if (email) {
    priceId = await getPriceIdForActiveUser(email);
  }
  console.log(priceId);

  let planName = "Buy a plan";

  const plan = pricingPlans.find((plan) => plan.priceId === priceId);

  if (plan) {
    planName = plan.name;
  } else if (!priceId) {
    planName = "Free";
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "ml-2 bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300 hidden lg:flex flex-row items-center",
        !priceId && "from-blue-100 to-blue-200 border-blue-300",
      )}
    >
      <Crown
        className={cn(
          "w-3 h-3 mr-1 text-purple-600",
          !priceId && "text-blue-600",
        )}
      />
      {planName}
    </Badge>
  );
}
