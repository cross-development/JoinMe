import { memo, FC } from 'react';

import { Link } from 'react-router';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from '@mui/material';
import { AccessTime, Place } from '@mui/icons-material';

import AvatarPopover from '@/app/shared/components/AvatarPopover';
import { formatDate } from '@/lib/utils/date';

type ActivityCardProps = {
  activity: Activity;
};

const ActivityCard: FC<ActivityCardProps> = memo(props => {
  const { activity } = props;

  const label = activity.isHost ? 'You are hosting' : 'You are going';
  const color = activity.isHost ? 'secondary' : activity.isGoing ? 'warning' : 'default';

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <CardHeader
          title={activity.title}
          avatar={<Avatar alt="image of host" src={activity.hostImageUrl} sx={{ height: 80, width: 80 }} />}
          slotProps={{ title: { fontWeight: 'bold', fontSize: 20 } }}
          subheader={
            <>
              Hosted by <Link to={`/profiles/${activity.hostId}`}>{activity.hostDisplayName}</Link>
            </>
          }
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mr: 2 }}>
          {(activity.isHost || activity.isGoing) && (
            <Chip variant="outlined" label={label} color={color} sx={{ borderRadius: 2 }} />
          )}

          {activity.isCanceled && <Chip label="Canceled" color="error" sx={{ borderRadius: 2 }} />}
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, px: 2 }}>
          <Box sx={{ display: 'flex', flexGrow: 0, alignItems: 'center' }}>
            <AccessTime sx={{ mr: 1 }} />

            <Typography noWrap variant="body2">
              {formatDate(activity.date)}
            </Typography>
          </Box>

          <Place sx={{ ml: 3, mr: 1 }} />

          <Typography variant="body2">
            {activity.country} / {activity.city} / {activity.venue}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', gap: 2, bgcolor: 'grey.20', py: 3, pl: 3 }}>
          {activity.attendees.map(attendee => (
            <AvatarPopover key={attendee.id} profile={attendee} />
          ))}
        </Box>
      </CardContent>

      <CardActions sx={{ display: 'flex', flexDirection: 'column', pb: 2 }}>
        <Typography variant="body2">{activity.description}</Typography>

        <Button
          size="medium"
          variant="contained"
          href={`/activities/${activity.id}`}
          LinkComponent={Link}
          sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3 }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
});

ActivityCard.displayName = 'ActivityCard';

export default ActivityCard;
