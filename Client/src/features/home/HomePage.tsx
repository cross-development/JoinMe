import { FC } from 'react';

import { Link } from 'react-router';
import { Group } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';

const HomePage: FC = () => (
  <Paper
    sx={{
      gap: 6,
      height: '100vh',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', alignContent: 'center', color: 'white', gap: 3 }}>
      <Group sx={{ height: 110, width: 110 }} />

      <Typography variant="h1">JoinMe</Typography>
    </Box>

    <Typography variant="h2">Welcome to JoinMe</Typography>

    <Button
      href="/activities"
      variant="contained"
      LinkComponent={Link}
      sx={{ height: 80, borderRadius: 4, fontSize: '1.5rem' }}
    >
      Take me to the activities!
    </Button>
  </Paper>
);

HomePage.displayName = 'HomePage';

export default HomePage;
