import { memo, FC, useCallback } from 'react';

import { Link } from 'react-router';
import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';

import { useActivities } from '../../../lib/hooks/useActivities';

type ActivityCardProps = {
  activity: Activity;
};

const ActivityCard: FC<ActivityCardProps> = memo(props => {
  const { activity } = props;

  const { deleteActivity } = useActivities();

  const handleDeleteActivity = useCallback(() => {
    deleteActivity.mutate(activity.id);
  }, [activity.id, deleteActivity]);

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>

        <Typography sx={{ color: 'text.secondary', mb: 1 }}>{activity.date}</Typography>

        <Typography variant="body2">{activity.description}</Typography>

        <Typography variant="subtitle1">
          {activity.country} / {activity.city} / {activity.venue}
        </Typography>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
        <Chip variant="outlined" label={activity.category} />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button size="medium" variant="contained" href={`/activities/${activity.id}`} LinkComponent={Link}>
            View
          </Button>

          <Button
            size="medium"
            color="error"
            variant="contained"
            disabled={deleteActivity.isPending}
            onClick={handleDeleteActivity}
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
});

ActivityCard.displayName = 'ActivityCard';

export default ActivityCard;
