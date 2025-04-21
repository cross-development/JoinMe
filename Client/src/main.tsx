import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV2';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { router } from './app/router/Routes';
import { store, StoreContext } from './lib/stores/store';

import './app/layout/styles.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/ReactToastify.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StoreContext.Provider value={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />

          <ToastContainer hideProgressBar theme="colored" position="bottom-right" />

          <RouterProvider router={router} />
        </QueryClientProvider>
      </StoreContext.Provider>
    </LocalizationProvider>
  </StrictMode>,
);
