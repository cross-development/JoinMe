import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';

import agent from '../api/agent';

type UseActivitiesParamsType = {
  id?: string;
};

type UseActivitiesReturnType = {
  activities?: Activity[];
  activity?: Activity;
  isLoadingActivity: boolean;
  isPending: boolean;
  createActivity: UseMutationResult<string, Error, Activity, unknown>;
  updateActivity: UseMutationResult<void, Error, Activity, unknown>;
  deleteActivity: UseMutationResult<void, Error, string, unknown>;
};

export const useActivities = (params: UseActivitiesParamsType = {}): UseActivitiesReturnType => {
  const queryClient = useQueryClient();

  const { data: activities, isPending } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await agent.get<Activity[]>('/activities');

      return response.data;
    },
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ['activities', params?.id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${params?.id}`);

      return response.data;
    },
    enabled: !!params?.id,
  });

  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.post<string>('/activities', activity);

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put('/activities', activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  return {
    activities,
    activity,
    isLoadingActivity,
    isPending,
    createActivity,
    updateActivity,
    deleteActivity,
  };
};
