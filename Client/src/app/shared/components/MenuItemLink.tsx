import { FC, memo, ReactNode } from 'react';

import { NavLink } from 'react-router';
import { MenuItem } from '@mui/material';

type MenuItemLinkProps = {
  href: string;
  children: ReactNode;
};

const MenuItemLink: FC<MenuItemLinkProps> = memo(props => {
  const { children, href } = props;

  return (
    <MenuItem
      disableRipple
      href={href}
      LinkComponent={NavLink}
      sx={{
        fontSize: '1.2rem',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'inherit',
        '&.active': { color: 'yellow' },
      }}
    >
      {children}
    </MenuItem>
  );
});

MenuItemLink.displayName = 'MenuItemLink';

export default MenuItemLink;
