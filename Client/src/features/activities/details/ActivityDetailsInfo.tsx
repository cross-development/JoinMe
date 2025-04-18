import { FC, memo } from 'react';

import { CalendarToday, Info, Place } from '@mui/icons-material';
import { Divider, Grid2, Paper, Typography } from '@mui/material';

import { formatDate } from '../../../lib/utils/date';

type ActivityDetailsInfoProps = {
  activity: Activity;
};

const ActivityDetailsInfo: FC<ActivityDetailsInfoProps> = memo(props => {
  const { activity } = props;

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

        <Grid2 size={11}>
          <Typography>
            {activity.venue}, {activity.city}, {activity.country}
          </Typography>
        </Grid2>
      </Grid2>
    </Paper>
  );
});

ActivityDetailsInfo.displayName = 'ActivityDetailsInfo';

export default ActivityDetailsInfo;
