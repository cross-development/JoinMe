import { FC, memo } from 'react';

import { useParams } from 'react-router';
import { Avatar, Box, Button, Chip, Divider, Grid2, Paper, Stack, Typography } from '@mui/material';

import { useProfile } from '@/lib/hooks/useProfile';

const ProfileHeader: FC = memo(() => {
  const { id } = useParams<{ id: string }>();

  const { profile, isCurrentUser, updateFollowing } = useProfile({ id });

  if (!profile) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={8}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar
              alt={profile.displayName + ' image'}
              src={profile.imageUrl}
              sx={{ width: 150, height: 150 }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h4">{profile.displayName}</Typography>

              {profile.isFollowing && (
                <Chip variant="outlined" color="secondary" label="Following" sx={{ borderRadius: 1 }} />
              )}
            </Box>
          </Stack>
        </Grid2>

        <Grid2 size={4}>
          <Stack direction="column" spacing={2} alignItems="center">
            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6">Followers</Typography>

                <Typography variant="h3">{profile.followersCount}</Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6">Following</Typography>

                <Typography variant="h3">{profile.followingCount}</Typography>
              </Box>
            </Box>

            {!isCurrentUser && (
              <>
                <Divider sx={{ width: '100%' }} />

                <Button
                  fullWidth
                  variant="outlined"
                  disabled={updateFollowing.isPending}
                  color={profile.isFollowing ? 'error' : 'success'}
                  onClick={() => updateFollowing.mutate()}
                >
                  {profile.isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
              </>
            )}
          </Stack>
        </Grid2>
      </Grid2>
    </Paper>
  );
});

ProfileHeader.displayName = 'ProfileHeader';

export default ProfileHeader;
