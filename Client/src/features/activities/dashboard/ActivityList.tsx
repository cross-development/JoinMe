import { FC, memo } from 'react';

import { Box } from '@mui/material';

import ActivityCard from './ActivityCard';

type ActivityListProps = {
  activities: Array<Activity>;
  onSelectActivity: (id: string) => void;
  onDeleteActivity: (id: string) => void;
};

const ActivityList: FC<ActivityListProps> = memo(props => {
  const { activities, onSelectActivity, onDeleteActivity } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {activities.map(activity => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onSelectActivity={onSelectActivity}
          onDeleteActivity={onDeleteActivity}
        />
      ))}
    </Box>
  );
});

ActivityList.displayName = 'ActivityList';

export default ActivityList;
