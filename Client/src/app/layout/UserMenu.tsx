import { memo, MouseEvent, useState, FC } from 'react';

import { Link } from 'react-router';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Add, Logout, Person } from '@mui/icons-material';
import { Avatar, Box, ListItemIcon, ListItemText } from '@mui/material';

import { useAccount } from '../../lib/hooks/useAccount';

const UserMenu: FC = memo(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { currentUser, logoutUser } = useAccount();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser.mutateAsync();
    handleClose();
  };

  return (
    <>
      <Button disableRipple size="large" onClick={handleClick} sx={{ color: 'inherit', fontSize: '1.1rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar alt="current user image" src={currentUser?.imageUrl} />

          {currentUser?.displayName}
        </Box>
      </Button>

      <Menu id="basic-menu" anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuItem LinkComponent={Link} href="/activities/create" onClick={handleClose}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>

          <ListItemText>Create Activity</ListItemText>
        </MenuItem>

        <MenuItem LinkComponent={Link} href={`/profile/${currentUser?.id}`} onClick={handleClose}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>

          <ListItemText>My profile</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>

          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
});

UserMenu.displayName = 'UserMenu';

export default UserMenu;
