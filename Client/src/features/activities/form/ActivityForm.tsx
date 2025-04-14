import { FC, FormEvent, useCallback } from 'react';

import { Link, useNavigate, useParams } from 'react-router';
import { Paper, Box, Typography, TextField, Button } from '@mui/material';

import { useActivities } from '../../../lib/hooks/useActivities';

const ActivityForm: FC = () => {
  const { id } = useParams<{ id?: string }>();

  const navigate = useNavigate();

  const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities({ id });

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const data: Record<string, FormDataEntryValue> = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      if (activity) {
        data.id = activity.id;

        await updateActivity.mutateAsync(data as unknown as Activity, {
          onSuccess: () => navigate(`/activities/${activity.id}`),
        });
      } else {
        await createActivity.mutateAsync(data as unknown as Activity, {
          onSuccess: id => navigate(`/activities/${id}`),
        });
      }
    },
    [activity, updateActivity, createActivity, navigate],
  );

  if (isLoadingActivity) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography gutterBottom variant="h5" color="primary">
        {activity ? 'Create activity' : 'Edit activity'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField name="title" label="Title" defaultValue={activity?.title} />

        <TextField
          multiline
          name="description"
          label="Description"
          rows={3}
          defaultValue={activity?.description}
        />

        <TextField name="category" label="Category" defaultValue={activity?.category} />

        <TextField
          name="date"
          label="Date"
          type="date"
          defaultValue={
            activity?.date
              ? new Date(activity.date).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0]
          }
        />

        <TextField name="country" label="Country" defaultValue={activity?.country} />

        <TextField name="city" label="City" defaultValue={activity?.city} />

        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
          <Button color="inherit" href="/activities" LinkComponent={Link}>
            Cancel
          </Button>

          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

ActivityForm.displayName = 'ActivityForm';

export default ActivityForm;
