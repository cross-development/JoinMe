import { FC, memo } from 'react';

import { Link } from 'react-router';
import { Person } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Chip, Divider, Typography } from '@mui/material';

type ProfileCardProps = {
  profile: Profile;
};

const ProfileCard: FC<ProfileCardProps> = memo(props => {
  const { profile } = props;

  const following = false; // TODO: Replace with actual following state

  return (
    <Link to={`/profiles/${profile.id}`} style={{ textDecoration: 'none' }}>
      <Card elevation={4} sx={{ borderRadius: 3, padding: 2, maxWidth: 300, textDecoration: 'none' }}>
        <CardMedia
          component="img"
          alt={profile?.displayName + ' image'}
          src={profile?.imageUrl || '/images/user.png'}
          sx={{ width: '100%', zIndex: 50 }}
        />

        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h5">{profile.displayName}</Typography>

            {profile.bio && (
              <Typography
                variant="body2"
                sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
              >
                {profile.bio}
              </Typography>
            )}

            {following && <Chip size="small" label="Following" color="secondary" variant="outlined" />}
          </Box>
        </CardContent>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Person />

          <Typography sx={{ ml: 1 }}>20 Followers</Typography>
        </Box>
      </Card>
    </Link>
  );
});

ProfileCard.displayName = 'ProfileCard';

export default ProfileCard;
