import BillingForm from "@/components/shared/billing-form";
import { getUserSubscriptionPlan } from "@/lib/stripe";

export default async function BillingPage() {
  const subscriptionPlan = await getUserSubscriptionPlan();

  return <BillingForm subscriptionPlan={subscriptionPlan} />;
}
