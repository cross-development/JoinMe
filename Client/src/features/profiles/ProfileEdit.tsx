import { FC, memo, useEffect } from 'react';

import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';

import TextInput from '@/app/shared/components/TextInput';
import { useProfile } from '@/lib/hooks/useProfile';
import { EditProfileSchema, editProfileSchema } from '@/lib/schemas/editProfileSchema';

type ProfileEditProps = {
  onSetEditMode: (editMode: boolean) => void;
};

const ProfileEdit: FC<ProfileEditProps> = memo(props => {
  const { onSetEditMode } = props;

  const { id } = useParams<{ id: string }>();

  const { updateProfile, profile } = useProfile({ id });

  const {
    control,
    formState: { isDirty, isValid },
    reset,
    handleSubmit,
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    reset({ displayName: profile?.displayName, bio: profile?.bio || '' });
  }, [profile, reset]);

  const handleSubmitForm = (data: EditProfileSchema) => {
    updateProfile.mutate(data, {
      onSuccess: () => onSetEditMode(false),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleSubmitForm)}
      sx={{ display: 'flex', alignContent: 'center', flexDirection: 'column', mt: 3, gap: 3 }}
    >
      <TextInput label="Display Name" name="displayName" control={control} />

      <TextInput multiline label="Add your bio" name="bio" rows={4} control={control} />

      <Button type="submit" variant="contained" disabled={!isValid || !isDirty || updateProfile.isPending}>
        Update profile
      </Button>
    </Box>
  );
});

ProfileEdit.displayName = 'ProfileEdit';

export default ProfileEdit;
