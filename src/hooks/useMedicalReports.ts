
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface MedicalReport {
  id: string;
  title: string;
  file_name: string;
  created_at: string;
  analysis_status: string;
  ai_insights: any;
}

export const useMedicalReports = () => {
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [latestReport, setLatestReport] = useState<MedicalReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchReports = async () => {
      try {
        const { data, error } = await supabase
          .from('medical_reports')
          .select('*')
          .eq('user_id', user.id)
          .eq('analysis_status', 'completed')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching reports:', error);
          return;
        }

        setReports(data || []);
        if (data && data.length > 0) {
          setLatestReport(data[0]);
        }
      } catch (error) {
        console.error('Error in fetchReports:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [user]);

  return {
    reports,
    latestReport,
    isLoading
  };
};
