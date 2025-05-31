import { FC } from 'react';

import { Grid2 } from '@mui/material';

import ActivityList from '@/features/activities/dashboard/ActivityList';
import ActivityFilters from '@/features/activities/dashboard/ActivityFilters';

const ActivityDashboard: FC = () => (
  <Grid2 container spacing={3}>
    <Grid2 size={8}>
      <ActivityList />
    </Grid2>

    <Grid2 size={4}>
      <ActivityFilters />
    </Grid2>
  </Grid2>
);

ActivityDashboard.displayName = 'ActivityDashboard';

export default ActivityDashboard;
