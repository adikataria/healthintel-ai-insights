
-- Update RLS policy to allow public access to active subscription plans
DROP POLICY IF EXISTS "Anyone can view active subscription plans" ON public.subscription_plans;

CREATE POLICY "Public can view active subscription plans"
  ON public.subscription_plans
  FOR SELECT
  TO public
  USING (is_active = true);
