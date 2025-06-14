
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export interface FamilyProfile {
  id: string;
  user_id: string;
  name: string;
  relationship: string;
  date_of_birth?: string;
  gender?: string;
  medical_notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useFamilyProfiles = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: profiles = [], isLoading, error } = useQuery({
    queryKey: ['family-profiles', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('family_profiles')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const createProfile = useMutation({
    mutationFn: async (profileData: Partial<FamilyProfile>) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('family_profiles')
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
      queryClient.invalidateQueries({ queryKey: ['family-profiles'] });
      toast({
        title: "Family Member Added",
        description: "Family member has been added successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add family member",
        variant: "destructive",
      });
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (profileData: Partial<FamilyProfile> & { id: string }) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { id, ...updateData } = profileData;
      const { data, error } = await supabase
        .from('family_profiles')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['family-profiles'] });
      toast({
        title: "Family Member Updated",
        description: "Family member has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update family member",
        variant: "destructive",
      });
    },
  });

  const deleteProfile = useMutation({
    mutationFn: async (profileId: string) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('family_profiles')
        .update({ is_active: false })
        .eq('id', profileId)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['family-profiles'] });
      toast({
        title: "Family Member Removed",
        description: "Family member has been removed successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove family member",
        variant: "destructive",
      });
    },
  });

  return {
    profiles,
    isLoading,
    error,
    createProfile,
    updateProfile,
    deleteProfile,
  };
};
