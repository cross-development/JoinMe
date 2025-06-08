import { Dispatch, SetStateAction, useMemo, useState } from 'react';

import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';

import agent from '@/lib/api/agent';
import { EditProfileSchema } from '@/lib/schemas/editProfileSchema';

type UseProfileParamsType = {
  id?: string;
  predicate?: string;
};

type UseProfileReturnType = {
  isLoadingProfile: boolean;
  profile?: Profile;
  isCurrentUser: boolean;
  updateProfile: UseMutationResult<void, Error, EditProfileSchema, unknown>;
  followings?: Profile[];
  isLoadingFollowing: boolean;
  updateFollowing: UseMutationResult<void, Error, void, unknown>;
  filter: string | null;
  setFilter: Dispatch<SetStateAction<string | null>>;
  userActivities?: Activity[];
  isLoadingUserActivities: boolean;
};

export const useProfile = (params: UseProfileParamsType = {}): UseProfileReturnType => {
  const [filter, setFilter] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile', params.id],
    queryFn: async () => {
      const response = await agent.get<Profile>(`/profiles/${params.id}`);

      return response.data;
    },
    enabled: !!params.id && !params.predicate,
  });

  const { data: followings, isLoading: isLoadingFollowing } = useQuery({
    queryKey: ['followings', params.id, params.predicate],
    queryFn: async () => {
      const response = await agent.get<Profile[]>(
        `/profiles/${params.id}/follow-list?predicate=${params.predicate}`,
      );

      return response.data;
    },
    enabled: !!params.id && !!params.predicate,
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

  const updateFollowing = useMutation({
    mutationFn: async () => {
      await agent.post(`/profiles/${params.id}/follow`);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['followings', params.id, 'followers'] });

      queryClient.setQueryData<Profile>(['profile', params.id], profile => {
        if (!profile || profile.followersCount === undefined) return profile;

        return {
          ...profile,
          isFollowing: !profile.isFollowing,
          followersCount: profile.isFollowing ? profile.followersCount - 1 : profile.followersCount + 1,
        };
      });
    },
  });

  const { data: userActivities, isLoading: isLoadingUserActivities } = useQuery({
    queryKey: ['user-activities', filter],
    queryFn: async () => {
      const response = await agent.get<Activity[]>(`/profiles/${params.id}/activities`, {
        params: { filter },
      });

      return response.data;
    },
    enabled: !!params.id && !!filter,
  });

  const isCurrentUser = useMemo(() => {
    return params.id === queryClient.getQueryData<User>(['user'])?.id;
  }, [params.id, queryClient]);

  return {
    isCurrentUser,
    profile,
    isLoadingProfile,
    updateProfile,
    followings,
    isLoadingFollowing,
    updateFollowing,
    filter,
    setFilter,
    userActivities,
    isLoadingUserActivities,
  };
};
