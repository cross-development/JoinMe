import { FC, FormEvent, memo, useCallback } from 'react';

import { Paper, Box, Typography, TextField, Button } from '@mui/material';

type ActivityFormProps = {
  activity?: Activity;
  onCloseForm: () => void;
  onSubmitForm: (activity: Activity) => void;
};

const ActivityForm: FC<ActivityFormProps> = memo(props => {
  const { activity, onCloseForm, onSubmitForm } = props;

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const data: Record<string, FormDataEntryValue> = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      if (activity) {
        data.id = activity.id;
      }

      onSubmitForm(data as unknown as Activity);
    },
    [activity, onSubmitForm],
  );

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography gutterBottom variant="h5" color="primary">
        Create activity
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

        <TextField name="date" label="Date" type="date" defaultValue={activity?.date} />

        <TextField name="country" label="Country" defaultValue={activity?.country} />

        <TextField name="city" label="City" defaultValue={activity?.city} />

        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
          <Button color="inherit" onClick={onCloseForm}>
            Cancel
          </Button>

          <Button type="submit" color="success" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
});

ActivityForm.displayName = 'ActivityForm';

export default ActivityForm;
