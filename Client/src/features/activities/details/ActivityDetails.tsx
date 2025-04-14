import { FC } from 'react';

import { Link, useParams } from 'react-router';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { useActivities } from '../../../lib/hooks/useActivities';

const ActivityDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { activity, isLoadingActivity } = useActivities({ id });

  if (isLoadingActivity) {
    return <Typography>Loading...</Typography>;
  }

  if (!activity) {
    return <Typography>Not found</Typography>;
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
        <Button color="primary" href={`/activities/${activity.id}/edit`} LinkComponent={Link}>
          Edit
        </Button>

        <Button color="inherit" href="/activities" LinkComponent={Link}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

ActivityDetails.displayName = 'ActivityDetails';

export default ActivityDetails;
