import { useCallback, useEffect, useState } from 'react';

import { Box, Container, CssBaseline } from '@mui/material';

import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

import axios from 'axios';

const App = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();

  useEffect(() => {
    axios
      .get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data));
  }, []);

  const handleSelectActivity = useCallback(
    (id: string) => setSelectedActivity(activities.find(activity => activity.id === id)),
    [activities],
  );

  const handleCancelSelectActivity = useCallback(() => setSelectedActivity(undefined), []);

  const handleOpenForm = useCallback(
    (id?: string) => {
      if (id) {
        handleSelectActivity(id);
      } else {
        handleCancelSelectActivity();
      }

      setEditMode(true);
    },
    [handleCancelSelectActivity, handleSelectActivity],
  );

  const handleFormClose = useCallback(() => setEditMode(false), []);

  const handleDeleteActivity = useCallback((id: string) => {
    setActivities(prevState => prevState.filter(activity => activity.id !== id));
  }, []);

  const handleSubmitForm = useCallback((activity: Activity) => {
    if (activity.id) {
      setActivities(prevState => prevState.map(a => (a.id === activity.id ? activity : a)));
    } else {
      const newActivity = { ...activity, id: (Math.random() + 1).toString(36).substring(7) };

      setSelectedActivity(newActivity);
      setActivities(prevState => [...prevState, newActivity]);
    }

    setEditMode(false);
  }, []);

  return (
    <Box sx={{ bgcolor: '#eeeeee' }}>
      <CssBaseline />

      <NavBar onOpenForm={handleOpenForm} />

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashboard
          editMode={editMode}
          activities={activities}
          selectedActivity={selectedActivity}
          onOpenForm={handleOpenForm}
          onCloseForm={handleFormClose}
          onSubmitForm={handleSubmitForm}
          onDeleteActivity={handleDeleteActivity}
          onSelectActivity={handleSelectActivity}
          onCancelSelectActivity={handleCancelSelectActivity}
        />
      </Container>
    </Box>
  );
};

export default App;
