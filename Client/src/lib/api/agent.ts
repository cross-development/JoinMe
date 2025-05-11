import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';

import { store } from '../stores/store';
import { router } from '../../app/router/Routes';

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

agent.interceptors.request.use(config => {
  store.uiStore.isBusy();

  return config;
});

agent.interceptors.response.use(
  async response => {
    await sleep(1000); // Simulate a delay of 1 second

    store.uiStore.isIdle();

    return response;
  },
  async (error: AxiosError) => {
    await sleep(1000); // Simulate a delay of 1 second

    store.uiStore.isIdle();

    const { status, data } = error.response!;

    switch (status) {
      case 400: {
        const errors = (data as ValidationError).errors;

        if (errors) {
          const modalStateErrors = [];

          for (const key in errors) {
            modalStateErrors.push(errors[key]);
          }

          throw modalStateErrors.flat();
        } else {
          toast.error(data as string);
          break;
        }
      }

      case 401: {
        toast.error('Unauthorized');
        break;
      }

      case 404: {
        router.navigate('/not-found');
        break;
      }

      case 500: {
        router.navigate('/server-error', { state: { error: data } });
        break;
      }

      default: {
        toast.error('Unknown error');
        break;
      }
    }

    return Promise.reject(error);
  },
);

export default agent;
