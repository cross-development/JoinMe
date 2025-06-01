import { FC, memo } from 'react';

import { useParams } from 'react-router';
import { Grid2, Typography } from '@mui/material';

import ProfileHeader from '@/features/profiles/ProfileHeader';
import ProfileContent from '@/features/profiles/ProfileContent';
import { useProfile } from '@/lib/hooks/useProfile';

const ProfilePage: FC = memo(() => {
  const { id } = useParams<{ id: string }>();

  const { profile, isLoadingProfile } = useProfile({ id });

  if (isLoadingProfile) {
    return <Typography>Loading profile...</Typography>;
  }

  if (!profile) {
    return <Typography>Profile not found</Typography>;
  }

  return (
    <Grid2 container>
      <Grid2 size={12}>
        <ProfileHeader />

        <ProfileContent />
      </Grid2>
    </Grid2>
  );
});

ProfilePage.displayName = 'ProfilePage';

export default ProfilePage;
