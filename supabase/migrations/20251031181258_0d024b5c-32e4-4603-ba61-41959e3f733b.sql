-- Add missing columns to medical_reports table
ALTER TABLE public.medical_reports 
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS analysis_status TEXT DEFAULT 'pending';

-- Update existing records to have a title
UPDATE public.medical_reports 
SET title = COALESCE(file_name, 'Medical Report')
WHERE title IS NULL;

-- Create report_exports table if needed
CREATE TABLE IF NOT EXISTS public.report_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  report_id UUID REFERENCES public.medical_reports(id) ON DELETE CASCADE,
  export_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT,
  status TEXT DEFAULT 'completed',
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on report_exports
ALTER TABLE public.report_exports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for report_exports
CREATE POLICY "Users can view their own exports"
  ON public.report_exports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own exports"
  ON public.report_exports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own exports"
  ON public.report_exports FOR DELETE
  USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_report_exports_updated_at
  BEFORE UPDATE ON public.report_exports
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();