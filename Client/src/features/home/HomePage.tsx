import { FC } from 'react';

import { Container, Typography } from '@mui/material';

const HomePage: FC = () => {
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h3">Home page</Typography>
    </Container>
  );
};

HomePage.displayName = 'HomePage';

export default HomePage;
