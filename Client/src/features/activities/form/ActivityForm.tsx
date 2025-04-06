import { FC, FormEvent, memo, useCallback } from 'react';

import { Paper, Box, Typography, TextField, Button } from '@mui/material';

import { useActivities } from '../../../lib/hooks/useActivities';

type ActivityFormProps = {
  selectedActivity?: Activity;
  onCloseForm: () => void;
};

const ActivityForm: FC<ActivityFormProps> = memo(props => {
  const { selectedActivity, onCloseForm } = props;

  const { updateActivity, createActivity } = useActivities();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const data: Record<string, FormDataEntryValue> = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      if (selectedActivity) {
        data.id = selectedActivity.id;

        await updateActivity.mutateAsync(data as unknown as Activity);
      } else {
        await createActivity.mutateAsync(data as unknown as Activity);
      }

      onCloseForm();
    },
    [selectedActivity, updateActivity, createActivity, onCloseForm],
  );

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography gutterBottom variant="h5" color="primary">
        Create activity
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField name="title" label="Title" defaultValue={selectedActivity?.title} />

        <TextField
          multiline
          name="description"
          label="Description"
          rows={3}
          defaultValue={selectedActivity?.description}
        />

        <TextField name="category" label="Category" defaultValue={selectedActivity?.category} />

        <TextField
          name="date"
          label="Date"
          type="date"
          defaultValue={
            selectedActivity?.date
              ? new Date(selectedActivity.date).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0]
          }
        />

        <TextField name="country" label="Country" defaultValue={selectedActivity?.country} />

        <TextField name="city" label="City" defaultValue={selectedActivity?.city} />

        <TextField name="venue" label="Venue" defaultValue={selectedActivity?.venue} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
          <Button color="inherit" onClick={onCloseForm}>
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
});

ActivityForm.displayName = 'ActivityForm';

export default ActivityForm;
