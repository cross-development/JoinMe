import { FC, memo, useState, SyntheticEvent } from 'react';

import { Box, Paper, Tab, Tabs } from '@mui/material';

import ProfileAbout from '@/features/profiles/ProfileAbout';
import ProfilePhotos from '@/features/profiles/ProfilePhotos';
import ProfileFollowings from '@/features/profiles/ProfileFollowings';
import ProfileActivities from '@/features/profiles/ProfileActivities';

const ProfileContent: FC = memo(() => {
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  const tabContent = [
    { label: 'About', content: <ProfileAbout /> },
    { label: 'Photos', content: <ProfilePhotos /> },
    { label: 'Events', content: <ProfileActivities /> },
    { label: 'Followers', content: <ProfileFollowings activeTab={value} /> },
    { label: 'Following', content: <ProfileFollowings activeTab={value} /> },
  ];

  return (
    <Box
      elevation={3}
      component={Paper}
      sx={{ p: 3, mt: 2, height: 500, display: 'flex', alignItems: 'flex-start', borderRadius: 3 }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, height: 450, minWidth: 200 }}
      >
        {tabContent.map((tab, index) => (
          <Tab key={index} label={tab.label} sx={{ mr: 3 }} />
        ))}
      </Tabs>

      <Box sx={{ flexGrow: 1, p: 3, pt: 0 }}>{tabContent[value].content}</Box>
    </Box>
  );
});

ProfileContent.displayName = 'ProfileContent';

export default ProfileContent;
