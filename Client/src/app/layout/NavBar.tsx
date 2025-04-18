import { FC, memo } from 'react';

import { NavLink } from 'react-router';
import { Group } from '@mui/icons-material';
import { AppBar, Box, Container, MenuItem, Toolbar, Typography } from '@mui/material';

import MenuItemLink from '../shared/components/MenuItemLink';

const NavBar: FC = memo(() => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)' }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem disableRipple href="/" LinkComponent={NavLink} sx={{ display: 'flex', gap: 2 }}>
                <Group fontSize="large" />

                <Typography variant="h4" fontWeight="bold">
                  JoinMe
                </Typography>
              </MenuItem>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <MenuItemLink href="/activities">Activities</MenuItemLink>

              <MenuItemLink href="/activities/create">Create activity</MenuItemLink>
            </Box>

            <MenuItem>User menu</MenuItem>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
});

NavBar.displayName = 'NavBar';

export default NavBar;
