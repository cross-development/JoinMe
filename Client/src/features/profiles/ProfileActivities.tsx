import { FC, memo, SyntheticEvent, useEffect, useState } from 'react';

import { format } from 'date-fns';
import { Link, useParams } from 'react-router';
import { Box, Card, CardContent, CardMedia, Grid2, Tab, Tabs, Typography } from '@mui/material';

import { useProfile } from '@/lib/hooks/useProfile';

const ProfileActivities: FC = memo(() => {
  const [activeTab, setActiveTab] = useState(0);

  const { id } = useParams();

  const { userActivities, isLoadingUserActivities, setFilter } = useProfile({ id });

  useEffect(() => {
    setFilter('future');
  }, [setFilter]);

  const tabs = [
    { menuItem: 'Future Events', key: 'future' },
    { menuItem: 'Past Events', key: 'past' },
    { menuItem: 'Hosting', key: 'hosting' },
  ];

  const handleTabChange = (_: SyntheticEvent, newValue: number): void => {
    setActiveTab(newValue);
    setFilter(tabs[newValue].key);
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.menuItem} />
            ))}
          </Tabs>
        </Grid2>
      </Grid2>

      {(!userActivities || userActivities.length === 0) && !isLoadingUserActivities ? (
        <Typography mt={2}>No activities to show</Typography>
      ) : null}

      <Grid2 container spacing={2} sx={{ marginTop: 2, height: 400, overflow: 'auto' }}>
        {userActivities &&
          userActivities.map((activity: Activity) => (
            <Grid2 size={2} key={activity.id}>
              <Link to={`/activities/${activity.id}`} style={{ textDecoration: 'none' }}>
                <Card elevation={4}>
                  <CardMedia
                    component="img"
                    alt={activity.title}
                    image={`/images/categoryImages/${activity.category}.jpg`}
                    sx={{ objectFit: 'cover', height: 100 }}
                  />

                  <CardContent>
                    <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
                      {activity.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}
                    >
                      <span>{format(activity.date, 'do LLL yyyy')}</span>

                      <span>{format(activity.date, 'h:mm a')}</span>
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid2>
          ))}
      </Grid2>
    </Box>
  );
});

ProfileActivities.displayName = 'ProfileActivities';

export default ProfileActivities;
