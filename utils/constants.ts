export const pricingPlans = [
  {
    name: "Free",
    price: 0,
    description: "Try Summarize for free",
    items: [
      "2 PDF summaries for free",
      "Standard processing speed",
      "No payment required",
    ],
    id: "free",
    paymentLink: null,
    priceId: null,
  },
  {
    name: "Basic",
    price: 9,
    description: "Perfect for occasional use",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
    paymentLink: "https://buy.stripe.com/test_eVqdR24SJgWifhO67SbQY00",
    priceId: "price_1Rk2f24YwZh7aTvkBg802QLl",
  },
  {
    name: "Pro",
    price: 19,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    id: "pro",
    paymentLink: "https://buy.stripe.com/test_bJe28k84V5dA5HedAkbQY01",
    priceId: "price_1Rk2fp4YwZh7aTvkpWaoRjtE",
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
};
