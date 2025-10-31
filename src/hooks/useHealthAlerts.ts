
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export interface HealthAlert {
  id: string;
  user_id: string;
  alert_type: 'critical' | 'warning' | 'info' | 'reminder';
  category: 'medication' | 'appointment' | 'test_result' | 'general';
  title: string;
  message: string;
  is_read: boolean;
  is_dismissed: boolean;
  created_at: string;
  updated_at: string;
}

export const useHealthAlerts = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: alerts = [], isLoading, error } = useQuery({
    queryKey: ['health-alerts', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('health_alerts')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_dismissed', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as HealthAlert[];
    },
    enabled: !!user?.id,
  });

  const markAsRead = useMutation({
    mutationFn: async (alertId: string) => {
      const { error } = await supabase
        .from('health_alerts')
        .update({ is_read: true })
        .eq('id', alertId)
        .eq('user_id', user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-alerts'] });
    },
  });

  const dismissAlert = useMutation({
    mutationFn: async (alertId: string) => {
      const { error } = await supabase
        .from('health_alerts')
        .update({ is_dismissed: true })
        .eq('id', alertId)
        .eq('user_id', user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-alerts'] });
    },
  });

  return {
    alerts,
    isLoading,
    error,
    markAsRead,
    dismissAlert,
    unreadCount: alerts.filter(alert => !alert.is_read).length,
    criticalAlerts: alerts.filter(alert => alert.alert_type === 'critical'),
  };
};
