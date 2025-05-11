import { FC, memo, useCallback } from 'react';

import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { LockOpen } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, Typography } from '@mui/material';

import TextInput from '../../app/shared/components/TextInput';
import { useAccount } from '../../lib/hooks/useAccount';
import { registerSchema, RegisterSchema } from '../../lib/schemas/registerSchema';

const RegisterForm: FC = memo(() => {
  const {
    control,
    setError,
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = useForm<RegisterSchema>({
    mode: 'onTouched',
    resolver: zodResolver(registerSchema),
  });

  const { registerUser } = useAccount();

  const handleSubmitForm = useCallback(
    async (data: RegisterSchema) => {
      await registerUser.mutateAsync(data, {
        onError: error => {
          if (Array.isArray(error)) {
            error.forEach(err => {
              if (err.includes('Email')) setError('email', { message: err });
              else if (err.includes('Password')) setError('password', { message: err });
            });
          }
        },
      });
    },
    [registerUser, setError],
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

        <Typography variant="h4">Register</Typography>
      </Box>

      <TextInput label="Email" name="email" control={control} />

      <TextInput label="Display name" name="displayName" control={control} />

      <TextInput label="Password" name="password" type="password" control={control} />

      <Button type="submit" variant="contained" size="large" disabled={!isValid || isSubmitting}>
        Register
      </Button>

      <Typography sx={{ textAlign: 'center' }}>
        Already have an account?
        <Typography color="primary" to="/login" component={Link} sx={{ ml: 2 }}>
          Sign in
        </Typography>
      </Typography>
    </Paper>
  );
});

RegisterForm.displayName = 'RegisterForm';

export default RegisterForm;
