import { FC, memo } from 'react';

import { Grid2 } from '@mui/material';

import ActivityFilters from '@/features/activities/dashboard/ActivityFilters';

const ActivityDashboard: FC = memo(() => {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={4} sx={{ position: 'sticky', top: 112, alignSelf: 'flex-start' }}>
        <ActivityFilters />
      </Grid2>
    </Grid2>
  );
});

ActivityDashboard.displayName = 'ActivityDashboard';

export default ActivityDashboard;
