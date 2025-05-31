import { useMemo } from 'react';

import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';

import agent from '@/lib/api/agent';
import { EditProfileSchema } from '@/lib/schemas/editProfileSchema';

type UseProfileParamsType = {
  id?: string;
};

type UseProfileReturnType = {
  profile?: Profile;
  isLoadingProfile: boolean;
  isCurrentUser: boolean;
  updateProfile: UseMutationResult<void, Error, EditProfileSchema, unknown>;
};

export const useProfile = (params: UseProfileParamsType = {}): UseProfileReturnType => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile', params.id],
    queryFn: async () => {
      const response = await agent.get<Profile>(`/profiles/${params.id}`);

      return response.data;
    },
    enabled: !!params.id,
  });

  const updateProfile = useMutation({
    mutationFn: async (data: EditProfileSchema) => {
      await agent.put(`/profiles/${params.id}`, data);
    },
    onSuccess: async (_, profile) => {
      queryClient.setQueryData<Profile>(['profile', params.id], profile => {
        if (!profile) return profile;

        return { ...profile, displayName: profile.displayName, bio: profile.bio };
      });

      queryClient.setQueryData<User>(['user'], user => {
        if (!user) return user;

        return { ...user, displayName: profile.displayName, bio: profile.bio };
      });
    },
  });

  const isCurrentUser = useMemo(() => {
    return params.id === queryClient.getQueryData<User>(['user'])?.id;
  }, [params.id, queryClient]);

  return {
    profile,
    isLoadingProfile,
    isCurrentUser,
    updateProfile,
  };
};
