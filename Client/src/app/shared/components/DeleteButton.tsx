import { FC, memo } from 'react';

import { Box, Button } from '@mui/material';
import { DeleteOutline, Delete } from '@mui/icons-material';

const DeleteButton: FC = memo(() => (
  <Box sx={{ position: 'relative' }}>
    <Button sx={{ opacity: 0.8, transition: 'opacity 0.3s', position: 'relative', cursor: 'pointer' }}>
      <DeleteOutline sx={{ fontSize: 32, color: 'white', position: 'absolute' }} />

      <Delete sx={{ fontSize: 28, color: 'red' }} />
    </Button>
  </Box>
));

DeleteButton.displayName = 'DeleteButton';

export default DeleteButton;
