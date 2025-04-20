import { FC } from 'react';

import { Link } from 'react-router';
import { SearchOff } from '@mui/icons-material';
import { Button, Paper, Typography } from '@mui/material';

const NotFound: FC = () => (
  <Paper
    sx={{
      p: 6,
      height: 400,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <SearchOff color="primary" sx={{ fontSize: 100 }} />

    <Typography gutterBottom variant="h3">
      Oops - we could not find what you are looking for
    </Typography>

    <Button fullWidth href="/activities" LinkComponent={Link}>
      Return to the activity page
    </Button>
  </Paper>
);

NotFound.displayName = 'NotFound';

export default NotFound;
