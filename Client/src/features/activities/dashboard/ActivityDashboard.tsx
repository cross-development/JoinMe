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
  onDeleteActivity: (id: string) => void;
  onCancelSelectActivity: () => void;
  onOpenForm: (id: string) => void;
  onCloseForm: () => void;
  onSubmitForm: (activity: Activity) => void;
};

const ActivityDashboard: FC<ActivityDashboardProps> = memo(props => {
  const {
    editMode,
    activities,
    selectedActivity,
    onOpenForm,
    onCloseForm,
    onSubmitForm,
    onSelectActivity,
    onDeleteActivity,
    onCancelSelectActivity,
  } = props;

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <ActivityList
          activities={activities}
          onSelectActivity={onSelectActivity}
          onDeleteActivity={onDeleteActivity}
        />
      </Grid2>

      <Grid2 size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            onOpenForm={onOpenForm}
            onCancelSelectActivity={onCancelSelectActivity}
          />
        )}

        {editMode && (
          <ActivityForm activity={selectedActivity} onCloseForm={onCloseForm} onSubmitForm={onSubmitForm} />
        )}
      </Grid2>
    </Grid2>
  );
});

ActivityDashboard.displayName = 'ActivityDashboard';

export default ActivityDashboard;
