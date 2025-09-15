-- Create medical reports storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('medical-reports', 'medical-reports', false);

-- Create RLS policies for medical reports bucket
-- Allow authenticated users to upload their own files
CREATE POLICY "Users can upload their own medical reports" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'medical-reports' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to view their own files
CREATE POLICY "Users can view their own medical reports" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'medical-reports' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their own files
CREATE POLICY "Users can update their own medical reports" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'medical-reports' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own medical reports" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'medical-reports' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);