import { FC } from 'react';

import { Box, Container, CssBaseline } from '@mui/material';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';

import NavBar from '@/app/layout/NavBar';
import HomePage from '@/features/home/HomePage';

const App: FC = () => {
  const location = useLocation();

  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <ScrollRestoration />

      <CssBaseline />

      {location.pathname === '/' ? (
        <HomePage />
      ) : (
        <>
          <NavBar />

          <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  );
};

App.displayName = 'App';

export default App;
