import { FC, memo } from 'react';

import { Link } from 'react-router';
import { Card, CardMedia, Box, Typography, Chip } from '@mui/material';

import { formatDate } from '../../../lib/utils/date';
import { useActivities } from '../../../lib/hooks/useActivities';
import StyledButton from '../../../app/shared/components/StyledButton';

type ActivityDetailsHeaderProps = {
  activity: Activity;
};

const ActivityDetailsHeader: FC<ActivityDetailsHeaderProps> = memo(props => {
  const { activity } = props;

  const { updateAttendance } = useActivities({ id: activity.id });

  return (
    <Card sx={{ position: 'relative', mb: 2, backgroundColor: 'transparent', overflow: 'hidden' }}>
      {activity.isCanceled && (
        <Chip
          color="error"
          label="Canceled"
          sx={{ position: 'absolute', left: 40, top: 20, zIndex: 1000, borderRadius: 1 }}
        />
      )}

      <CardMedia
        height="300"
        component="img"
        alt={`${activity.category} image`}
        image={`/images/categoryImages/${activity.category}.jpg`}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          color: 'white',
          padding: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)',
          boxSizing: 'border-box',
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {activity.title}
          </Typography>

          <Typography variant="subtitle1">{formatDate(activity.date)}</Typography>

          <Typography variant="subtitle2">
            Hosted by{' '}
            <Link to={`/profiles/${activity.hostId}`} style={{ color: 'white', fontWeight: 'bold' }}>
              {activity.hostDisplayName}
            </Link>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {activity.isHost ? (
            <>
              <StyledButton
                variant="contained"
                disabled={updateAttendance.isPending}
                color={activity.isCanceled ? 'success' : 'error'}
                onClick={() => updateAttendance.mutate(activity.id)}
              >
                {activity.isCanceled ? 'Re-activate Activity' : 'Cancel Activity'}
              </StyledButton>

              <StyledButton
                color="primary"
                variant="contained"
                LinkComponent={Link}
                disabled={activity.isCanceled}
                href={`/manage/${activity.id}`}
              >
                Manage Event
              </StyledButton>
            </>
          ) : (
            <StyledButton
              variant="contained"
              color={activity.isGoing ? 'primary' : 'info'}
              disabled={updateAttendance.isPending || activity.isCanceled}
              onClick={() => updateAttendance.mutate(activity.id)}
            >
              {activity.isGoing ? 'Cancel Attendance' : 'Join Activity'}
            </StyledButton>
          )}
        </Box>
      </Box>
    </Card>
  );
});

ActivityDetailsHeader.displayName = 'ActivityDetailsHeader';

export default ActivityDetailsHeader;
