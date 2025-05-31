import { memo, FC, useState } from 'react';

import { useParams } from 'react-router';
import { Box, Button, Divider, Typography } from '@mui/material';

import ProfileEdit from '@/features/profiles/ProfileEdit';
import { useProfile } from '@/lib/hooks/useProfile';

const ProfileAbout: FC = memo(() => {
  const [editMode, setEditMode] = useState(false);

  const { id } = useParams<{ id: string }>();

  const { profile, isCurrentUser } = useProfile({ id });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">About {profile?.displayName}</Typography>

        {isCurrentUser && (
          <Button variant="outlined" onClick={() => setEditMode(prevState => !prevState)}>
            {editMode ? 'Cancel' : 'Edit Profile'}
          </Button>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ overflow: 'auto', maxHeight: 350 }}>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {profile?.bio || 'No description added yet.'}
        </Typography>

        {editMode && <ProfileEdit onSetEditMode={setEditMode} />}
      </Box>
    </Box>
  );
});

ProfileAbout.displayName = 'ProfileAbout';

export default ProfileAbout;
