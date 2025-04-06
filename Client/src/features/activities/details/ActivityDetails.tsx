import { FC, memo, useMemo } from 'react';

import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { useActivities } from '../../../lib/hooks/useActivities';

type ActivityDetailsProps = {
  selectedActivity: Activity;
  onOpenForm: (id: string) => void;
  onCancelSelectActivity: () => void;
};

const ActivityDetails: FC<ActivityDetailsProps> = memo(props => {
  const { selectedActivity, onOpenForm, onCancelSelectActivity } = props;

  const { activities } = useActivities();

  const activity = useMemo(
    () => activities?.find(activity => activity.id === selectedActivity.id),
    [activities, selectedActivity.id],
  );

  if (!activity) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia component="image" src={`/images/categoryImages/${activity.category}.jpg`} />

      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>

        <Typography variant="subtitle1" fontWeight="light">
          {activity.date}
        </Typography>

        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>

      <CardActions>
        <Button color="primary" onClick={() => onOpenForm(activity.id)}>
          Edit
        </Button>

        <Button color="inherit" onClick={onCancelSelectActivity}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
});

ActivityDetails.displayName = 'ActivityDetails';

export default ActivityDetails;
