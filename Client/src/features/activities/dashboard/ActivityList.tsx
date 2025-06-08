import { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { Box, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

import ActivityCard from '@/features/activities/dashboard/ActivityCard';
import { useActivities } from '@/lib/hooks/useActivities';

const ActivityList: FC = observer(() => {
  const { activitiesGroup, isLoading, hasNextPage, fetchNextPage } = useActivities();

  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!activitiesGroup) {
    return <Typography>Not activities found</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {activitiesGroup.pages.map((activities, index) => (
        <Box
          key={index}
          ref={index === activitiesGroup.pages.length - 1 ? ref : null}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          {activities.items.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </Box>
      ))}
    </Box>
  );
});

ActivityList.displayName = 'ActivityList';

export default ActivityList;
