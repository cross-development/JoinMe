import { FC, memo, MouseEvent, useState } from 'react';

import { Link } from 'react-router';
import { Avatar, Popover } from '@mui/material';

import ProfileCard from '@/features/profiles/ProfileCard';

type AvatarPopoverProps = {
  profile: Profile;
};

const AvatarPopover: FC<AvatarPopoverProps> = memo(props => {
  const { profile } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => setAnchorEl(null);

  return (
    <>
      <Avatar
        to={`/profiles/${profile.id}`}
        alt={profile.displayName + ' image'}
        src={profile.imageUrl}
        component={Link}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ border: profile.isFollowing ? 3 : 0, borderColor: 'primary.main' }}
      />

      <Popover
        id="mouse-over-popover"
        disableRestoreFocus
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handlePopoverClose}
        sx={{ pointerEvents: 'none' }}
      >
        <ProfileCard profile={profile} />
      </Popover>
    </>
  );
});

AvatarPopover.displayName = 'AvatarPopover';

export default AvatarPopover;
