import { createBrowserRouter, Navigate } from 'react-router';

import App from '@/app/layout/App';
import RequireAuth from '@/app/router/RequireAuth';
import HomePage from '@/features/home/HomePage';
import ActivityForm from '@/features/activities/form/ActivityForm';
import ActivityDetailsPage from '@/features/activities/details/ActivityDetailsPage';
import ActivityDashboard from '@/features/activities/dashboard/ActivityDashboard';
import TestErrors from '@/features/errors/TestErrors';
import NotFound from '@/features/errors/NotFound';
import ServerError from '@/features/errors/ServerError';
import LoginForm from '@/features/account/LoginForm';
import RegisterForm from '@/features/account/RegisterForm';
import ProfilePage from '@/features/profiles/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: 'activities', element: <ActivityDashboard /> },
          { path: 'activities/:id', element: <ActivityDetailsPage /> },
          { path: 'activities/create', element: <ActivityForm key="create" /> },
          { path: 'activities/:id/edit', element: <ActivityForm key="edit" /> },
          { path: 'profiles/:id', element: <ProfilePage /> },
        ],
      },
      { path: '', element: <HomePage /> },
      { path: 'errors', element: <TestErrors /> },
      { path: 'not-found', element: <NotFound /> },
      { path: 'server-error', element: <ServerError /> },
      { path: 'login', element: <LoginForm /> },
      { path: 'register', element: <RegisterForm /> },
      { path: '*', element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
