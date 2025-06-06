import { FC } from 'react';

import { Box, Typography } from '@mui/material';

import ActivityCard from '@/features/activities/dashboard/ActivityCard';
import { useActivities } from '@/lib/hooks/useActivities';

const ActivityList: FC = () => {
  const { activities, isLoading } = useActivities();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!activities) {
    return <Typography>Not activities found</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {activities.map(activity => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </Box>
  );
};

ActivityList.displayName = 'ActivityList';

export default ActivityList;
