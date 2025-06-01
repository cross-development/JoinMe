import { FC, KeyboardEvent } from 'react';

import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router';
import { FieldValues, useForm } from 'react-hook-form';
import { Box, Typography, Card, CardContent, TextField, Avatar, CircularProgress } from '@mui/material';

import { timeAgo } from '@/lib/utils/date';
import { useComments } from '@/lib/hooks/useComments';

const ActivityDetailsChat: FC = observer(() => {
  const { id } = useParams<{ id: string }>();

  const { commentStore } = useComments({ activityId: id });

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const addComment = async (data: FieldValues) => {
    try {
      await commentStore.hubConnection?.invoke('SendComment', {
        activityId: id,
        body: data.body,
      });

      reset();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      handleSubmit(addComment)();
    }
  };

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
                {...register('body', { required: true })}
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                slotProps={{ input: { endAdornment: isSubmitting ? <CircularProgress size={24} /> : null } }}
                onKeyDown={handleKeyPress}
              />
            </form>
          </div>

          <Box sx={{ height: 400, overflow: 'auto' }}>
            {commentStore.comments.map(comment => (
              <Box key={comment.id} sx={{ display: 'flex', my: 2 }}>
                <Avatar src={comment.imageUrl} alt="user image" sx={{ mr: 2 }} />

                <Box display="flex" flexDirection="column">
                  <Box display="flex" alignItems="center" gap={3}>
                    <Typography
                      variant="subtitle1"
                      component={Link}
                      to={`/profiles/${comment.userId}`}
                      sx={{ fontWeight: 'bold', textDecoration: 'none' }}
                    >
                      {comment.displayName}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      {timeAgo(comment.createdAt)}
                    </Typography>
                  </Box>

                  <Typography sx={{ whiteSpace: 'pre-wrap' }}>{comment.body}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
});

ActivityDetailsChat.displayName = 'ActivityDetailsChat';

export default ActivityDetailsChat;
