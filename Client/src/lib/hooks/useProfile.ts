import { useMemo } from 'react';

import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';

import agent from '../api/agent';

type UseProfileParamsType = {
  id?: string;
};

type UseProfileReturnType = {
  profile?: Profile;
  isLoadingProfile: boolean;
  photos?: Photo[];
  isLoadingPhotos: boolean;
  isCurrentUser: boolean;
  uploadPhoto: UseMutationResult<Photo, Error, Blob, unknown>;
  deletePhoto: UseMutationResult<void, Error, string, unknown>;
  setMainPhoto: UseMutationResult<void, Error, Photo, unknown>;
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

  const { data: photos, isLoading: isLoadingPhotos } = useQuery({
    queryKey: ['photos', params.id],
    queryFn: async () => {
      const response = await agent.get<Photo[]>(`/profiles/${params.id}/photos`);

      return response.data;
    },
    enabled: !!params.id,
  });

  const uploadPhoto = useMutation({
    mutationFn: async (file: Blob) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await agent.post<Photo>('/profiles/add-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    },
    onSuccess: async (photo: Photo) => {
      await queryClient.invalidateQueries({ queryKey: ['photos', params.id] });

      queryClient.setQueryData<User>(['user'], user => {
        if (!user) return user;

        return {
          ...user,
          imageUrl: user.imageUrl ?? photo.url,
        };
      });

      queryClient.setQueryData<Profile>(['profile', params.id], profile => {
        if (!profile) return profile;

        return {
          ...profile,
          imageUrl: profile.imageUrl ?? photo.url,
        };
      });
    },
  });

  const deletePhoto = useMutation({
    mutationFn: async (photoId: string) => {
      await agent.delete(`/profiles/${photoId}/photos`);
    },
    onSuccess: async (_, photoId) => {
      queryClient.setQueryData<Photo[]>(['photos', params.id], photos => {
        if (!photos) return photos;

        return photos.filter(photo => photo.id !== photoId);
      });
    },
  });

  const setMainPhoto = useMutation({
    mutationFn: async (photo: Photo) => {
      await agent.put(`/profiles/${photo.id}/set-main-photo`);
    },
    onSuccess: async (_, photo) => {
      queryClient.setQueryData<User>(['user'], user => {
        if (!user) return user;

        return {
          ...user,
          imageUrl: photo.url,
        };
      });

      queryClient.setQueryData<Profile>(['profile', params.id], profile => {
        if (!profile) return profile;

        return {
          ...profile,
          imageUrl: photo.url,
        };
      });
    },
  });

  const isCurrentUser = useMemo(() => {
    return params.id === queryClient.getQueryData<User>(['user'])?.id;
  }, [params.id, queryClient]);

  return {
    profile,
    isLoadingProfile,
    photos,
    isLoadingPhotos,
    isCurrentUser,
    uploadPhoto,
    setMainPhoto,
    deletePhoto,
  };
};
