import { FC } from 'react';

import { useParams } from 'react-router';
import { Grid2, Typography } from '@mui/material';

import ActivityDetailsHeader from '@/features/activities/details/ActivityDetailsHeader';
import ActivityDetailsInfo from '@/features/activities/details/ActivityDetailsInfo';
import ActivityDetailsChat from '@/features/activities/details/ActivityDetailsChat';
import ActivityDetailsSidebar from '@/features/activities/details/ActivityDetailsSidebar';
import { useActivities } from '@/lib/hooks/useActivities';

const ActivityDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { activity, isLoadingActivity } = useActivities({ id });

  if (isLoadingActivity) {
    return <Typography>Loading...</Typography>;
  }

  if (!activity) {
    return <Typography>Not found</Typography>;
  }

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={8}>
        <ActivityDetailsHeader activity={activity} />

        <ActivityDetailsInfo activity={activity} />

        <ActivityDetailsChat />
      </Grid2>

      <Grid2 size={4}>
        <ActivityDetailsSidebar activity={activity} />
      </Grid2>
    </Grid2>
  );
};

ActivityDetailsPage.displayName = 'ActivityDetailsPage';

export default ActivityDetailsPage;
