
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export interface HealthGoal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  target_value?: number;
  current_value?: number;
  unit?: string;
  metric_type?: string;
  target_date?: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export const useHealthGoals = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: goals = [], isLoading, error } = useQuery({
    queryKey: ['health-goals', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('health_goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as HealthGoal[];
    },
    enabled: !!user?.id,
  });

  const createGoal = useMutation({
    mutationFn: async (goalData: Omit<HealthGoal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('health_goals')
        .insert({
          user_id: user.id,
          ...goalData,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-goals'] });
      toast({
        title: "Goal Created",
        description: "Your health goal has been created successfully.",
      });
    },
  });

  const updateGoal = useMutation({
    mutationFn: async ({ id, ...goalData }: Partial<HealthGoal> & { id: string }) => {
      const { data, error } = await supabase
        .from('health_goals')
        .update(goalData)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-goals'] });
      toast({
        title: "Goal Updated",
        description: "Your health goal has been updated successfully.",
      });
    },
  });

  const deleteGoal = useMutation({
    mutationFn: async (goalId: string) => {
      const { error } = await supabase
        .from('health_goals')
        .delete()
        .eq('id', goalId)
        .eq('user_id', user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-goals'] });
      toast({
        title: "Goal Deleted",
        description: "Your health goal has been deleted successfully.",
      });
    },
  });

  return {
    goals,
    isLoading,
    error,
    createGoal,
    updateGoal,
    deleteGoal,
    activeGoals: goals.filter(goal => goal.status === 'active'),
    completedGoals: goals.filter(goal => goal.status === 'completed'),
  };
};
