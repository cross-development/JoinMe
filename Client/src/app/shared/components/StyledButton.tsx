import { FC } from 'react';

import { Button, styled, ButtonProps } from '@mui/material';

const StyledButton: FC<ButtonProps> = styled(Button)(({ theme }) => ({
  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.text.disabled,
  },
}));

StyledButton.displayName = 'StyledButton';

export default StyledButton;
