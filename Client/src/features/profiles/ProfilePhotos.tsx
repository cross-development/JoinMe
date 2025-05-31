import { FC, memo, useCallback, useState } from 'react';

import { useParams } from 'react-router';
import { Box, Button, Divider, ImageList, ImageListItem, Typography } from '@mui/material';

import StarButton from '@/app/shared/components/StarButton';
import DeleteButton from '@/app/shared/components/DeleteButton';
import PhotoUploadWidget from '@/app/shared/components/PhotoUploadWidget';
import { useProfile } from '@/lib/hooks/useProfile';
import { useProfilePhotos } from '@/lib/hooks/useProfilePhotos';

const ProfilePhotos: FC = memo(() => {
  const { id } = useParams<{ id: string }>();

  const [editMode, setEditMode] = useState(false);

  const { profile, isCurrentUser } = useProfile({ id });

  const { photos, isLoadingPhotos, uploadPhoto, deletePhoto, setMainPhoto } = useProfilePhotos({ id });

  const handlePhotoUpload = useCallback(
    (file: Blob) => {
      uploadPhoto.mutate(file, { onSuccess: () => setEditMode(false) });
    },
    [uploadPhoto],
  );

  const handleSetMainPhoto = useCallback(
    (photo: Photo) => {
      setMainPhoto.mutate(photo);
    },
    [setMainPhoto],
  );

  const handleDeletePhoto = useCallback(
    (photo: Photo) => {
      deletePhoto.mutate(photo.id);
    },
    [deletePhoto],
  );

  if (isLoadingPhotos) {
    return <Typography>Loading...</Typography>;
  }

  if (!photos) {
    return <Typography>No photos found for this user</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Photos</Typography>

        {isCurrentUser && (
          <Button onClick={() => setEditMode(prevState => !prevState)}>
            {editMode ? 'Cancel' : 'Add photos'}
          </Button>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      {editMode ? (
        <PhotoUploadWidget isLoading={uploadPhoto.isPending} onUploadPhoto={handlePhotoUpload} />
      ) : (
        <>
          {!photos.length && (
            <Typography variant="subtitle1" color="textSecondary">
              No photos added yet.
            </Typography>
          )}

          <ImageList sx={{ height: 450 }} cols={6} rowHeight={164}>
            {photos.map(item => (
              <ImageListItem key={item.id}>
                <img
                  loading="lazy"
                  alt="user profile image"
                  src={item.url.replace('/upload/', '/upload/w_164,h_164,c_fill,f_auto,g_face/')}
                  srcSet={item.url.replace('/upload/', '/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/')}
                />

                {isCurrentUser && (
                  <Box>
                    <Box
                      sx={{ position: 'absolute', top: 0, left: 0 }}
                      onClick={() => handleSetMainPhoto(item)}
                    >
                      <StarButton isSelected={item.url === profile?.imageUrl} />
                    </Box>

                    {profile?.imageUrl !== item.url && (
                      <Box
                        sx={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={() => handleDeletePhoto(item)}
                      >
                        <DeleteButton />
                      </Box>
                    )}
                  </Box>
                )}
              </ImageListItem>
            ))}
          </ImageList>
        </>
      )}
    </Box>
  );
});

ProfilePhotos.displayName = 'ProfilePhotos';

export default ProfilePhotos;
