import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';

import { useDropzone } from 'react-dropzone';
import { CloudUpload } from '@mui/icons-material';
import { Box, Button, Grid2, Typography } from '@mui/material';
import Cropper, { ReactCropperElement } from 'react-cropper';

import 'cropperjs/dist/cropper.css';

type PhotoUploadWidgetProps = {
  isLoading: boolean;
  onUploadPhoto: (file: Blob) => void;
};

const PhotoUploadWidget: FC<PhotoUploadWidgetProps> = memo(props => {
  const { isLoading, onUploadPhoto } = props;

  const cropperRef = useRef<ReactCropperElement>(null);

  const [files, setFiles] = useState<(File & { preview: string })[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  useEffect(() => {
    return () => {
      // Revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const handleCropImage = useCallback(() => {
    const cropper = cropperRef.current?.cropper;

    cropper?.getCroppedCanvas().toBlob(blob => {
      if (blob) onUploadPhoto(blob);
    });
  }, [onUploadPhoto]);

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={4}>
        <Typography variant="overline" color="secondary">
          Step 1 - Add photo
        </Typography>

        <Box
          {...getRootProps()}
          sx={{
            border: '3px dashed #eee',
            borderColor: isDragActive ? 'green' : '#eee',
            borderRadius: '5px',
            paddingTop: '30px',
            textAlign: 'center',
            height: '280px',
          }}
        >
          <input {...getInputProps()} />

          <CloudUpload sx={{ fontSize: 80 }} />

          <Typography variant="h4" color="textSecondary">
            Drop image here
          </Typography>
        </Box>
      </Grid2>

      <Grid2 size={4}>
        <Typography variant="overline" color="secondary">
          Step 2 - Resize image
        </Typography>

        {files[0]?.preview && (
          <Cropper
            ref={cropperRef}
            guides={false}
            background={false}
            preview=".img-preview"
            viewMode={1}
            aspectRatio={1}
            initialAspectRatio={1}
            src={files[0]?.preview}
            style={{ height: 300, width: '90%' }}
          />
        )}
      </Grid2>

      <Grid2 size={4}>
        <Typography variant="overline" color="secondary">
          Step 3 - Preview & upload
        </Typography>

        {files[0]?.preview && (
          <>
            <Box className="image-preview" sx={{ width: 300, height: 300, overflow: 'hidden' }} />

            <Button
              fullWidth
              color="secondary"
              variant="contained"
              disabled={isLoading}
              onClick={handleCropImage}
              sx={{ my: 1 }}
            >
              Upload
            </Button>
          </>
        )}
      </Grid2>
    </Grid2>
  );
});

PhotoUploadWidget.displayName = 'PhotoUploadWidget';

export default PhotoUploadWidget;
