import { FC, memo } from 'react';

import { Typography } from '@mui/material';
import { Navigate, Outlet, useLocation } from 'react-router';

import { useAccount } from '../../lib/hooks/useAccount';

const RequireAuth: FC = memo(() => {
  const location = useLocation();

  const { currentUser, isUserInfoLoading } = useAccount();

  if (isUserInfoLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
});

RequireAuth.displayName = 'RequireAuth';

export default RequireAuth;
