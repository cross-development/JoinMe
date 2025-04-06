import { FC, memo } from 'react';

import { Box } from '@mui/material';

import ActivityCard from './ActivityCard';

type ActivityListProps = {
  activities: Array<Activity>;
  onSelectActivity: (id: string) => void;
};

const ActivityList: FC<ActivityListProps> = memo(props => {
  const { activities, onSelectActivity } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {activities.map(activity => (
        <ActivityCard key={activity.id} activity={activity} onSelectActivity={onSelectActivity} />
      ))}
    </Box>
  );
});

ActivityList.displayName = 'ActivityList';

export default ActivityList;
