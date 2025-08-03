
-- Update Premium plan pricing to ₹10
UPDATE subscription_plans 
SET 
  price_monthly = 10,
  price_annual = 100, -- Setting annual to ₹100 (roughly 10 months price with 2 months free)
  updated_at = now()
WHERE name = 'Premium';
