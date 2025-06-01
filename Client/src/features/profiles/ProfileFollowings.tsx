import { FC, memo } from 'react';

import { useParams } from 'react-router';
import { Box, Divider, Typography } from '@mui/material';

import ProfileCard from '@/features/profiles/ProfileCard';
import { useProfile } from '@/lib/hooks/useProfile';

type ProfileFollowingsProps = {
  activeTab: number;
};

const ProfileFollowings: FC<ProfileFollowingsProps> = memo(props => {
  const { activeTab } = props;

  const { id } = useParams<{ id: string }>();

  const { profile, followings, isLoadingFollowing } = useProfile({
    id,
    predicate: activeTab === 3 ? 'followers' : 'followings',
  });

  if (isLoadingFollowing) {
    return <Typography>Loading...</Typography>;
  }

  if (!followings || !followings.length) {
    return (
      <Typography>
        {activeTab === 3
          ? `No people following ${profile?.displayName} yet.`
          : `No people ${profile?.displayName} is following yet.`}
      </Typography>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h5">
          {activeTab === 3
            ? `People following ${profile?.displayName}`
            : `People ${profile?.displayName} is following`}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', mt: 3, gap: 3 }}>
        {followings?.map(following => (
          <ProfileCard key={following.id} profile={following} />
        ))}
      </Box>
    </Box>
  );
});

ProfileFollowings.displayName = 'ProfileFollowings';

export default ProfileFollowings;
