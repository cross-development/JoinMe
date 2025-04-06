import { FC, memo } from 'react';

import { Grid2 } from '@mui/material';

import ActivityList from './ActivityList';
import ActivityForm from '../form/ActivityForm';
import ActivityDetails from '../details/ActivityDetails';

type ActivityDashboardProps = {
  editMode: boolean;
  activities: Array<Activity>;
  selectedActivity?: Activity;
  onSelectActivity: (id: string) => void;
  onCancelSelectActivity: () => void;
  onOpenForm: (id: string) => void;
  onCloseForm: () => void;
};

const ActivityDashboard: FC<ActivityDashboardProps> = memo(props => {
  const {
    editMode,
    activities,
    selectedActivity,
    onOpenForm,
    onCloseForm,
    onSelectActivity,
    onCancelSelectActivity,
  } = props;

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <ActivityList activities={activities} onSelectActivity={onSelectActivity} />
      </Grid2>

      <Grid2 size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            selectedActivity={selectedActivity}
            onOpenForm={onOpenForm}
            onCancelSelectActivity={onCancelSelectActivity}
          />
        )}

        {editMode && <ActivityForm selectedActivity={selectedActivity} onCloseForm={onCloseForm} />}
      </Grid2>
    </Grid2>
  );
});

ActivityDashboard.displayName = 'ActivityDashboard';

export default ActivityDashboard;
