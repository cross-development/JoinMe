import { FC } from 'react';

import { Grid2 } from '@mui/material';

import ActivityList from './ActivityList';

const ActivityDashboard: FC = () => {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <ActivityList />
      </Grid2>

      <Grid2 size={5}>Activity filters go here</Grid2>
    </Grid2>
  );
};

ActivityDashboard.displayName = 'ActivityDashboard';

export default ActivityDashboard;
