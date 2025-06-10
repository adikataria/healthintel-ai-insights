
-- Create user profiles table with enhanced health data
CREATE TABLE IF NOT EXISTS public.user_health_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  height DECIMAL(5,2), -- in cm
  weight DECIMAL(5,2), -- in kg
  date_of_birth DATE,
  gender TEXT,
  blood_type TEXT,
  medical_history JSONB DEFAULT '{}',
  family_history JSONB DEFAULT '{}',
  allergies TEXT[],
  medications TEXT[],
  lifestyle_data JSONB DEFAULT '{}', -- exercise, diet, sleep, etc.
  emergency_contact JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create health goals table
CREATE TABLE IF NOT EXISTS public.health_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_value DECIMAL(10,2),
  current_value DECIMAL(10,2) DEFAULT 0,
  unit TEXT, -- mg/dL, %, kg, etc.
  metric_type TEXT, -- cholesterol, weight, vitamin_d, etc.
  target_date DATE,
  status TEXT DEFAULT 'active', -- active, completed, paused, cancelled
  priority TEXT DEFAULT 'medium', -- low, medium, high
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create health alerts table
CREATE TABLE IF NOT EXISTS public.health_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  alert_type TEXT NOT NULL, -- critical, warning, reminder, milestone
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  metric_name TEXT,
  metric_value DECIMAL(10,2),
  severity TEXT DEFAULT 'medium', -- low, medium, high, critical
  is_read BOOLEAN DEFAULT false,
  is_dismissed BOOLEAN DEFAULT false,
  action_taken BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create health milestones table
CREATE TABLE IF NOT EXISTS public.health_milestones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  goal_id UUID REFERENCES public.health_goals,
  title TEXT NOT NULL,
  description TEXT,
  milestone_type TEXT, -- goal_achieved, improvement, streak, etc.
  value_achieved DECIMAL(10,2),
  percentage_improvement DECIMAL(5,2),
  is_shared BOOLEAN DEFAULT false,
  celebration_shown BOOLEAN DEFAULT false,
  achieved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create family profiles table
CREATE TABLE IF NOT EXISTS public.family_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL, -- the account owner
  name TEXT NOT NULL,
  relationship TEXT, -- spouse, child, parent, sibling, etc.
  date_of_birth DATE,
  gender TEXT,
  medical_notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  notification_settings JSONB DEFAULT '{}',
  display_preferences JSONB DEFAULT '{}',
  privacy_settings JSONB DEFAULT '{}',
  ai_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create report exports table
CREATE TABLE IF NOT EXISTS public.report_exports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  export_type TEXT NOT NULL, -- pdf, csv, json
  file_name TEXT NOT NULL,
  file_url TEXT,
  report_ids UUID[],
  date_range_start DATE,
  date_range_end DATE,
  status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
  download_count INTEGER DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for all new tables
ALTER TABLE public.user_health_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_exports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_health_profiles
CREATE POLICY "Users can view their own health profile" ON public.user_health_profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own health profile" ON public.user_health_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own health profile" ON public.user_health_profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own health profile" ON public.user_health_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for health_goals
CREATE POLICY "Users can view their own health goals" ON public.health_goals
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own health goals" ON public.health_goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own health goals" ON public.health_goals
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own health goals" ON public.health_goals
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for health_alerts
CREATE POLICY "Users can view their own health alerts" ON public.health_alerts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own health alerts" ON public.health_alerts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own health alerts" ON public.health_alerts
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own health alerts" ON public.health_alerts
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for health_milestones
CREATE POLICY "Users can view their own health milestones" ON public.health_milestones
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own health milestones" ON public.health_milestones
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own health milestones" ON public.health_milestones
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own health milestones" ON public.health_milestones
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for family_profiles
CREATE POLICY "Users can view their own family profiles" ON public.family_profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own family profiles" ON public.family_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own family profiles" ON public.family_profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own family profiles" ON public.family_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for user_preferences
CREATE POLICY "Users can view their own preferences" ON public.user_preferences
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own preferences" ON public.user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own preferences" ON public.user_preferences
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own preferences" ON public.user_preferences
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for report_exports
CREATE POLICY "Users can view their own report exports" ON public.report_exports
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own report exports" ON public.report_exports
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own report exports" ON public.report_exports
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own report exports" ON public.report_exports
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_user_health_profiles_user_id ON public.user_health_profiles(user_id);
CREATE INDEX idx_health_goals_user_id ON public.health_goals(user_id);
CREATE INDEX idx_health_goals_status ON public.health_goals(status);
CREATE INDEX idx_health_alerts_user_id ON public.health_alerts(user_id);
CREATE INDEX idx_health_alerts_read ON public.health_alerts(is_read);
CREATE INDEX idx_health_milestones_user_id ON public.health_milestones(user_id);
CREATE INDEX idx_family_profiles_user_id ON public.family_profiles(user_id);
CREATE INDEX idx_user_preferences_user_id ON public.user_preferences(user_id);
CREATE INDEX idx_report_exports_user_id ON public.report_exports(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_health_profiles_updated_at 
  BEFORE UPDATE ON public.user_health_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_health_goals_updated_at 
  BEFORE UPDATE ON public.health_goals 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_family_profiles_updated_at 
  BEFORE UPDATE ON public.family_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at 
  BEFORE UPDATE ON public.user_preferences 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
