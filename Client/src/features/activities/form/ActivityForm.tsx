import { FC, useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useParams } from 'react-router';
import { Paper, Box, Typography, Button } from '@mui/material';

import TextInput from '../../../app/shared/components/TextInput';
import SelectInput from '../../../app/shared/components/SelectInput';
import DateTimeInput from '../../../app/shared/components/DateTimeInput';
import LocationInput from '../../../app/shared/components/LocationInput';
import { useActivities } from '../../../lib/hooks/useActivities';
import { categoryOptions } from '../../../lib/constants/categoryOptions';
import { activitySchema, ActivitySchema } from '../../../lib/schemas/activitySchema';

const ActivityForm: FC = () => {
  const { id } = useParams<{ id?: string }>();

  const navigate = useNavigate();

  const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities({ id });

  const { reset, handleSubmit, control } = useForm<ActivitySchema>({
    mode: 'onTouched',
    defaultValues: activity,
    resolver: zodResolver(activitySchema),
  });

  useEffect(() => {
    if (activity) {
      reset({
        ...activity,
        location: {
          country: activity.country,
          city: activity.city,
          venue: activity.venue,
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
      });
    }
  }, [activity, reset]);

  const handleSubmitForm = useCallback(
    async (data: ActivitySchema) => {
      const { location, ...rest } = data;
      const flattenedData = { ...rest, ...location };

      try {
        if (activity) {
          await updateActivity.mutateAsync(
            { ...activity, ...flattenedData },
            { onSuccess: () => navigate(`/activities/${activity.id}`) },
          );
        } else {
          await createActivity.mutateAsync(flattenedData as Activity, {
            onSuccess: id => navigate(`/activities/${id}`),
          });
        }
      } catch (error) {
        console.log('error :>> ', error);
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

      <Box
        component="form"
        onSubmit={handleSubmit(handleSubmitForm)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <TextInput name="title" label="Title" control={control} />

        <TextInput multiline name="description" label="Description" rows={3} control={control} />

        <Box sx={{ display: 'flex', gap: 3 }}>
          <SelectInput name="category" label="Category" control={control} items={categoryOptions} />

          <DateTimeInput name="date" label="Date" control={control} />
        </Box>

        <LocationInput name="location" label="Country" control={control} />

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
