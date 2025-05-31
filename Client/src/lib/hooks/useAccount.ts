import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';

import agent from '@/lib/api/agent';
import { LoginSchema } from '@/lib/schemas/loginSchema';
import { RegisterSchema } from '@/lib/schemas/registerSchema';

type UseAccountReturnType = {
  currentUser?: User;
  isUserInfoLoading: boolean;
  loginUser: UseMutationResult<void, Error, LoginSchema, unknown>;
  registerUser: UseMutationResult<void, Error, RegisterSchema, unknown>;
  logoutUser: UseMutationResult<void, Error, void, unknown>;
};

export const useAccount = (): UseAccountReturnType => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const loginUser = useMutation({
    mutationFn: async (data: LoginSchema) => {
      await agent.post('/login?useCookies=true', data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const registerUser = useMutation({
    mutationFn: async (data: RegisterSchema) => {
      await agent.post('/account/register', data);
    },
    onSuccess: () => {
      toast.success('Register successful - you can now login');
      navigate('/login');
    },
  });

  const logoutUser = useMutation({
    mutationFn: async () => {
      await agent.post('/account/logout');
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      queryClient.removeQueries({ queryKey: ['activities'] });

      navigate('/');
    },
  });

  const { data: currentUser, isLoading: isUserInfoLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await agent.get<User>('/account/user-info');

      return response.data;
    },
    enabled: !queryClient.getQueryData(['user']),
  });

  return { loginUser, registerUser, logoutUser, currentUser, isUserInfoLoading };
};
