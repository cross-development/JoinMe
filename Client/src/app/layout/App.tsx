import { useCallback, useState } from 'react';

import { Box, Container, CssBaseline, Typography } from '@mui/material';

import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { useActivities } from '../../lib/hooks/useActivities';

const App = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();

  const { activities, isPending } = useActivities();

  const handleSelectActivity = useCallback(
    (id: string) => setSelectedActivity(activities?.find(activity => activity.id === id)),
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

  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />

      <NavBar onOpenForm={handleOpenForm} />

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
          <ActivityDashboard
            editMode={editMode}
            activities={activities}
            selectedActivity={selectedActivity}
            onOpenForm={handleOpenForm}
            onCloseForm={handleFormClose}
            onSelectActivity={handleSelectActivity}
            onCancelSelectActivity={handleCancelSelectActivity}
          />
        )}
      </Container>
    </Box>
  );
};

export default App;
