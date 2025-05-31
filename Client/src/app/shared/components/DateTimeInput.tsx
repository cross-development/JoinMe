import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

type DateTimeInputProps<T extends FieldValues> = UseControllerProps<T> & DateTimePickerProps;

const DateTimeInput = <T extends FieldValues>(props: DateTimeInputProps<T>) => {
  const { field, fieldState } = useController(props);

  return (
    <DateTimePicker
      {...props}
      value={field.value ? new Date(field.value) : null}
      onChange={(value: string | number) => {
        field.onChange(new Date(value));
      }}
      sx={{ width: '100%' }}
      slotProps={{
        textField: {
          onBlur: field.onBlur,
          error: !!fieldState.error,
          helperText: fieldState.error?.message,
        },
      }}
    />
  );
};

DateTimeInput.displayName = 'DateTimeInput';

export default DateTimeInput;
