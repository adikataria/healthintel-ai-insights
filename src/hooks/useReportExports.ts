
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export interface ReportExport {
  id: string;
  user_id: string;
  report_id?: string | null;
  export_type: string;
  file_name: string;
  file_path?: string | null;
  status: string;
  download_count: number;
  created_at: string;
  updated_at: string;
}

export const useReportExports = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: exports = [], isLoading, error } = useQuery({
    queryKey: ['report-exports', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('report_exports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ReportExport[];
    },
    enabled: !!user?.id,
  });

  return {
    exports,
    isLoading,
    error,
  };
};

export const useCreateReportExport = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const createExport = useMutation({
    mutationFn: async (exportData: Omit<ReportExport, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'status' | 'download_count'>) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('report_exports')
        .insert({
          user_id: user.id,
          status: 'completed',
          download_count: 0,
          ...exportData,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report-exports'] });
      toast({
        title: "Export Created",
        description: "Your report export has been queued for processing.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Export Failed", 
        description: error.message || "Failed to create export",
        variant: "destructive",
      });
    },
  });

  return { createExport };
};
