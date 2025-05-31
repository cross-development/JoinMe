import { memo, FC } from 'react';

import { useParams } from 'react-router';
import { Box, Button, Divider, Typography } from '@mui/material';

import { useProfile } from '../../lib/hooks/useProfile';

const ProfileAbout: FC = memo(() => {
  const { id } = useParams<{ id: string }>();

  const { profile } = useProfile({ id });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">About {profile?.displayName}</Typography>

        <Button>Edit profule</Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ overflow: 'auto', maxHeight: 350 }}>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {profile?.bio || 'No description added yet.'}
        </Typography>
      </Box>
    </Box>
  );
});

ProfileAbout.displayName = 'ProfileAbout';

export default ProfileAbout;
