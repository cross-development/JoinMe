import { FC, memo } from 'react';

import { Link } from 'react-router';
import { Card, Badge, CardMedia, Box, Typography, Button } from '@mui/material';

import { formatDate } from '../../../lib/utils/date';

type ActivityDetailsHeaderProps = {
  activity: Activity;
};

const ActivityDetailsHeader: FC<ActivityDetailsHeaderProps> = memo(props => {
  const { activity } = props;

  const isCancelled = false;
  const isHost = true;
  const isGoing = true;
  const loading = false;

  return (
    <Card sx={{ position: 'relative', mb: 2, backgroundColor: 'transparent', overflow: 'hidden' }}>
      {isCancelled && (
        <Badge
          color="error"
          badgeContent="Cancelled"
          sx={{ position: 'absolute', left: 40, top: 20, zIndex: 1000 }}
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
            <Link to={`/profiles/username`} style={{ color: 'white', fontWeight: 'bold' }}>
              Bob
            </Link>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {isHost ? (
            <>
              <Button variant="contained" color={isCancelled ? 'success' : 'error'} onClick={() => {}}>
                {isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
              </Button>

              <Button
                color="primary"
                variant="contained"
                LinkComponent={Link}
                disabled={isCancelled}
                href={`/manage/${activity.id}`}
              >
                Manage Event
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color={isGoing ? 'primary' : 'info'}
              disabled={isCancelled || loading}
              onClick={() => {}}
            >
              {isGoing ? 'Cancel Attendance' : 'Join Activity'}
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
});

ActivityDetailsHeader.displayName = 'ActivityDetailsHeader';

export default ActivityDetailsHeader;
