import { FC, memo, useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { LockOpen } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router';
import { Box, Button, Paper, Typography } from '@mui/material';

import TextInput from '../../app/shared/components/TextInput';
import { useAccount } from '../../lib/hooks/useAccount';
import { loginSchema, LoginSchema } from '../../lib/schemas/loginSchema';

const LoginForm: FC = memo(() => {
  const navigate = useNavigate();

  const location = useLocation();

  const {
    control,
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = useForm<LoginSchema>({
    mode: 'onTouched',
    resolver: zodResolver(loginSchema),
  });

  const { loginUser } = useAccount();

  const handleSubmitForm = useCallback(
    async (data: LoginSchema) => {
      await loginUser.mutateAsync(data, {
        onSuccess: () => navigate(location.state?.from || '/activities'),
      });
    },
    [location.state?.from, loginUser, navigate],
  );

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(handleSubmitForm)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        gap: 3,
        maxWidth: 'md',
        mx: 'auto',
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          gap: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'secondary.main',
        }}
      >
        <LockOpen fontSize="large" />

        <Typography variant="h4">Sign in</Typography>
      </Box>

      <TextInput label="Email" name="email" control={control} />

      <TextInput label="Password" name="password" type="password" control={control} />

      <Button type="submit" variant="contained" size="large" disabled={!isValid || isSubmitting}>
        Login
      </Button>

      <Typography sx={{ textAlign: 'center' }}>
        Don't have an account?
        <Typography color="primary" to="/register" component={Link} sx={{ ml: 2 }}>
          Sign up
        </Typography>
      </Typography>
    </Paper>
  );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
