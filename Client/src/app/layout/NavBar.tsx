import { FC, memo } from 'react';

import { NavLink } from 'react-router';
import { Observer } from 'mobx-react-lite';
import { Group } from '@mui/icons-material';
import { AppBar, Box, Container, LinearProgress, MenuItem, Toolbar, Typography } from '@mui/material';

import MenuItemLink from '../shared/components/MenuItemLink';
import { useStore } from '../../lib/hooks/useStore';

const NavBar: FC = memo(() => {
  const { uiStore } = useStore();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          position: 'relative',
          backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)',
        }}
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

              <MenuItemLink href="/errors">Errors</MenuItemLink>
            </Box>

            <MenuItem>User menu</MenuItem>
          </Toolbar>
        </Container>

        <Observer>
          {() =>
            uiStore.isLoading ? (
              <LinearProgress
                color="secondary"
                sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4 }}
              />
            ) : null
          }
        </Observer>
      </AppBar>
    </Box>
  );
});

NavBar.displayName = 'NavBar';

export default NavBar;
