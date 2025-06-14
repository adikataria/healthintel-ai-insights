
-- Insert default subscription plans with proper feature limits and usage
INSERT INTO public.subscription_plans (name, description, price_monthly, price_annual, features, max_report_uploads) VALUES
('Free', 'Perfect for getting started with DocLumen', 0.00, 0.00, 
 '["Basic AI chat functionality", "Up to 3 report uploads per month", "General preventative care tips", "Access to basic health resources", "Standard health insights", "Community support"]'::jsonb, 
 3),
('Premium', 'Comprehensive health management for serious users', 29.00, 24.00,
 '["Unlimited report uploads", "Advanced AI insights and analysis", "Personalized health plans", "Premium AI queries and consultations", "Advanced goal tracking and monitoring", "Detailed health analytics dashboard", "Priority support", "Export reports in multiple formats"]'::jsonb,
 -1),
('Pro', 'Enterprise-grade features for healthcare professionals', 99.00, 79.00,
 '["Everything in Premium", "Exclusive webinars and workshops", "In-depth health analytics", "Multi-patient management", "Advanced reporting tools", "API access for integrations", "White-label solutions", "24/7 dedicated support", "Custom health protocols"]'::jsonb,
 -1);
