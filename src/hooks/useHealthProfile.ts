
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export interface HealthProfile {
  id: string;
  user_id: string;
  height?: number;
  weight?: number;
  date_of_birth?: string;
  gender?: string;
  blood_type?: string;
  medical_history?: any;
  family_history?: any;
  allergies?: string[];
  medications?: string[];
  lifestyle_data?: any;
  emergency_contact?: any;
  created_at: string;
  updated_at: string;
}

export const useHealthProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['health-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('user_health_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      return data;
    },
    enabled: !!user?.id,
  });

  const createProfile = useMutation({
    mutationFn: async (profileData: Partial<HealthProfile>) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_health_profiles')
        .insert({
          user_id: user.id,
          ...profileData,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-profile'] });
      toast({
        title: "Profile Created",
        description: "Your health profile has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create profile",
        variant: "destructive",
      });
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (profileData: Partial<HealthProfile>) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_health_profiles')
        .update(profileData)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-profile'] });
      toast({
        title: "Profile Updated",
        description: "Your health profile has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  return {
    profile,
    isLoading,
    error,
    createProfile,
    updateProfile,
    hasProfile: !!profile,
  };
};
