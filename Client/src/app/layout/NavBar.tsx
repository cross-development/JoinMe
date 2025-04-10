import { FC, memo } from 'react';

import { Group } from '@mui/icons-material';
import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography } from '@mui/material';

type NavBarProps = {
  onOpenForm: () => void;
};

const NavBar: FC<NavBarProps> = memo(props => {
  const { onOpenForm } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)' }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem sx={{ display: 'flex', gap: 2 }}>
                <Group fontSize="large" />

                <Typography variant="h4" fontWeight="bold">
                  JoinMe
                </Typography>
              </MenuItem>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <MenuItem sx={{ fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Activities
              </MenuItem>

              <MenuItem sx={{ fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                About
              </MenuItem>

              <MenuItem sx={{ fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Contact
              </MenuItem>
            </Box>

            <Button size="large" variant="contained" color="warning" onClick={onOpenForm}>
              Create activity
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
});

NavBar.displayName = 'NavBar';

export default NavBar;
