import { FC } from 'react';

import { Outlet } from 'react-router';
import { Box, Container, CssBaseline } from '@mui/material';

import NavBar from './NavBar';

const App: FC = () => {
  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />

      <NavBar />

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

App.displayName = 'App';

export default App;
