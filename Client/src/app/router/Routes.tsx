import { createBrowserRouter } from 'react-router';

import App from '../layout/App';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'activities', element: <ActivityDashboard /> },
      { path: 'activities/:id', element: <ActivityDetails /> },
      { path: 'activities/create', element: <ActivityForm key="create" /> },
      { path: 'activities/:id/edit', element: <ActivityForm key="edit" /> },
    ],
  },
]);
