import { FC, memo, useState } from 'react';

import { CalendarToday, Info, Place } from '@mui/icons-material';
import { Box, Button, Divider, Grid2, Paper, Typography } from '@mui/material';

import ActivityMap from './ActivityMap';
import { formatDate } from '../../../lib/utils/date';

type ActivityDetailsInfoProps = {
  activity: Activity;
};

const ActivityDetailsInfo: FC<ActivityDetailsInfoProps> = memo(props => {
  const { activity } = props;

  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <Paper sx={{ mb: 2 }}>
      <Grid2 container sx={{ alignItems: 'center', pl: 2, py: 1 }}>
        <Grid2 size={1}>
          <Info color="info" fontSize="large" />
        </Grid2>

        <Grid2 size={11}>
          <Typography>{activity.description}</Typography>
        </Grid2>
      </Grid2>

      <Divider />

      <Grid2 container sx={{ alignItems: 'center', pl: 2, py: 1 }}>
        <Grid2 size={1}>
          <CalendarToday color="info" fontSize="large" />
        </Grid2>

        <Grid2 size={11}>
          <Typography>{formatDate(activity.date)}</Typography>
        </Grid2>
      </Grid2>

      <Divider />

      <Grid2 container sx={{ alignItems: 'center', pl: 2, py: 1 }}>
        <Grid2 size={1}>
          <Place color="info" fontSize="large" />
        </Grid2>

        <Grid2 size={11} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>
            {activity.venue}, {activity.city}, {activity.country}
          </Typography>

          <Button onClick={() => setIsMapOpen(prevState => !prevState)}>
            {isMapOpen ? 'Hide map' : 'Show map'}
          </Button>
        </Grid2>
      </Grid2>

      {isMapOpen && (
        <Box sx={{ height: 400, zIndex: 1000, display: 'block' }}>
          <ActivityMap
            venue={activity.venue}
            country={activity.country}
            position={[activity.latitude, activity.longitude]}
          />
        </Box>
      )}
    </Paper>
  );
});

ActivityDetailsInfo.displayName = 'ActivityDetailsInfo';

export default ActivityDetailsInfo;
