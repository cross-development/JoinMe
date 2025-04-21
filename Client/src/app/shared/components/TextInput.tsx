import { TextField, TextFieldProps } from '@mui/material';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

type TextInputProps<T extends FieldValues> = UseControllerProps<T> & TextFieldProps;

const TextInput = <T extends FieldValues>(props: TextInputProps<T>) => {
  const { field, fieldState } = useController(props);

  return (
    <TextField
      {...props}
      {...field}
      fullWidth
      variant="outlined"
      value={field.value || ''}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};

TextInput.displayName = 'TextInput';

export default TextInput;
