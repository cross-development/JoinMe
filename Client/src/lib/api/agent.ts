import axios from 'axios';

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

agent.interceptors.response.use(async response => {
  try {
    await sleep(1000); // Simulate a delay of 1 second

    return response;
  } catch (error) {
    console.error('Error in response interceptor:', error);

    return Promise.reject(error);
  }
});

export default agent;
