import { memo, FC } from 'react';

import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';

import { useActivities } from '../../../lib/hooks/useActivities';

type ActivityCardProps = {
  activity: Activity;
  onSelectActivity: (id: string) => void;
};

const ActivityCard: FC<ActivityCardProps> = memo(props => {
  const { activity, onSelectActivity } = props;

  const { deleteActivity } = useActivities();

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
          <Button size="medium" variant="contained" onClick={() => onSelectActivity(activity.id)}>
            View
          </Button>

          <Button
            size="medium"
            color="error"
            variant="contained"
            disabled={deleteActivity.isPending}
            onClick={() => deleteActivity.mutate(activity.id)}
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
