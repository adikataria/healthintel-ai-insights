
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export interface HealthMilestone {
  id: string;
  user_id: string;
  goal_id?: string | null;
  title: string;
  description?: string | null;
  target_date?: string | null;
  completed_date?: string | null;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export const useHealthMilestones = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: milestones = [], isLoading, error } = useQuery({
    queryKey: ['health-milestones', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('health_milestones')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as HealthMilestone[];
    },
    enabled: !!user?.id,
  });

  const createMilestone = useMutation({
    mutationFn: async (milestoneData: Omit<HealthMilestone, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('health_milestones')
        .insert({
          user_id: user.id,
          ...milestoneData,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-milestones'] });
      toast({
        title: "Milestone Created",
        description: "Your health milestone has been recorded successfully.",
      });
    },
  });

  const updateMilestone = useMutation({
    mutationFn: async ({ id, ...milestoneData }: Partial<HealthMilestone> & { id: string }) => {
      const { data, error } = await supabase
        .from('health_milestones')
        .update(milestoneData)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-milestones'] });
    },
  });

  return {
    milestones,
    isLoading,
    error,
    createMilestone,
    updateMilestone,
  };
};
