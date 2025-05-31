import { FC, memo } from 'react';

import { Box, Button } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

type StarButtonProps = {
  isSelected: boolean;
};

const StarButton: FC<StarButtonProps> = memo(props => {
  const { isSelected } = props;

  return (
    <Box sx={{ position: 'relative' }}>
      <Button sx={{ opacity: 0.8, transition: 'opacity 0.3s', position: 'relative', cursor: 'pointer' }}>
        <StarBorder sx={{ fontSize: 32, color: 'white', position: 'absolute' }} />

        <Star sx={{ fontSize: 28, color: isSelected ? 'yellow' : 'rgba(0, 0, 0, 0.5)' }} />
      </Button>
    </Box>
  );
});

StarButton.displayName = 'StarButton';

export default StarButton;
