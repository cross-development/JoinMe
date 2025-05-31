import { useLocation } from 'react-router';
import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';

import agent from '../api/agent';
import { useAccount } from './useAccount';

type UseActivitiesParamsType = {
  id?: string;
};

type UseActivitiesReturnType = {
  activities?: Activity[];
  activity?: Activity;
  isLoadingActivity: boolean;
  isLoading: boolean;
  createActivity: UseMutationResult<string, Error, Activity, unknown>;
  updateActivity: UseMutationResult<void, Error, Activity, unknown>;
  deleteActivity: UseMutationResult<void, Error, string, unknown>;
  updateAttendance: UseMutationResult<void, Error, string, unknown>;
};

export const useActivities = (params: UseActivitiesParamsType = {}): UseActivitiesReturnType => {
  const queryClient = useQueryClient();

  const location = useLocation();

  const { currentUser } = useAccount();

  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await agent.get<Activity[]>('/activities');

      return response.data;
    },
    select: data => {
      return data.map(activity => ({
        ...activity,
        isHost: activity.hostId === currentUser?.id,
        isGoing: activity.attendees.some(attendee => attendee.id === currentUser?.id),
        hostImageUrl: activity.attendees.find(attendee => attendee.id === activity.hostId)?.imageUrl,
      }));
    },
    enabled: !params?.id && location.pathname === '/activities' && !!currentUser,
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ['activities', params?.id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${params?.id}`);

      return response.data;
    },
    select: data => {
      return {
        ...data,
        isHost: data.hostId === currentUser?.id,
        isGoing: data.attendees.some(attendee => attendee.id === currentUser?.id),
        hostImageUrl: data?.attendees.find(attendee => attendee.id === data.hostId)?.imageUrl,
      };
    },
    enabled: !!params?.id && !!currentUser,
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

  const updateAttendance = useMutation({
    mutationFn: async (id: string) => {
      await agent.post(`/activities/${id}/attend`);
    },
    onMutate: async (activityId: string) => {
      await queryClient.cancelQueries({ queryKey: ['activities', activityId] });

      const previousActivity = queryClient.getQueryData<Activity>(['activities', activityId]);

      queryClient.setQueryData<Activity>(['activities', activityId], oldActivity => {
        if (!oldActivity || !currentUser) return oldActivity;

        const isHost = oldActivity.hostId === currentUser.id;
        const isAttending = oldActivity.attendees.some(attendee => attendee.id === currentUser.id);

        return {
          ...oldActivity,
          isCanceled: isHost ? !oldActivity.isCanceled : oldActivity.isCanceled,
          attendees: isAttending
            ? isHost
              ? oldActivity.attendees
              : oldActivity.attendees.filter(attendee => attendee.id !== currentUser.id)
            : [
                ...oldActivity.attendees,
                { id: currentUser.id, displayName: currentUser.displayName, imageUrl: currentUser.imageUrl },
              ],
        };
      });

      return { previousActivity };
    },
    onError: async (_, activityId, context) => {
      if (context?.previousActivity) {
        queryClient.setQueryData(['activities', activityId], context.previousActivity);
      }
    },
  });

  return {
    activities,
    activity,
    isLoadingActivity,
    isLoading,
    createActivity,
    updateActivity,
    deleteActivity,
    updateAttendance,
  };
};
