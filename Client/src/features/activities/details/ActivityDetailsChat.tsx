import { FC } from 'react';

import { Link } from 'react-router';
import { Box, Typography, Card, CardContent, TextField, Avatar } from '@mui/material';

const ActivityDetailsChat: FC = () => {
  return (
    <>
      <Box sx={{ textAlign: 'center', bgcolor: 'primary.main', color: 'white', padding: 2 }}>
        <Typography variant="h6">Chat about this event</Typography>
      </Box>

      <Card>
        <CardContent>
          <div>
            <form>
              <TextField
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
              />
            </form>
          </div>

          <Box>
            <Box sx={{ display: 'flex', my: 2 }}>
              <Avatar src="/images/user.png" alt="user image" sx={{ mr: 2 }} />

              <Box display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" gap={3}>
                  <Typography
                    component={Link}
                    variant="subtitle1"
                    to={`/profiles/username`}
                    sx={{ fontWeight: 'bold', textDecoration: 'none' }}
                  >
                    Bob
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    2 hours ago
                  </Typography>
                </Box>

                <Typography sx={{ whiteSpace: 'pre-wrap' }}>Comment goes here</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

ActivityDetailsChat.displayName = 'ActivityDetailsChat';

export default ActivityDetailsChat;
