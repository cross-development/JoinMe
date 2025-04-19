import axios from 'axios';

import { store } from '../stores/store';

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

agent.interceptors.request.use(config => {
  store.uiStore.isBusy();

  return config;
});

agent.interceptors.response.use(async response => {
  try {
    await sleep(1000); // Simulate a delay of 1 second

    return response;
  } catch (error) {
    console.error('Error in response interceptor:', error);

    return Promise.reject(error);
  } finally {
    store.uiStore.isIdle();
  }
});

export default agent;
