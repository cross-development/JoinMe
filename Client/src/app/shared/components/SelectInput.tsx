import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectInputProps as MuiSelectInputProps } from '@mui/material/Select/SelectInput';

type SelectInputProps<T extends FieldValues> = UseControllerProps<T> & {
  label: string;
  items: { text: string; value: string }[];
} & Partial<MuiSelectInputProps>;

const SelectInput = <T extends FieldValues>(props: SelectInputProps<T>) => {
  const { field, fieldState } = useController(props);

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{props.label}</InputLabel>

      <Select label={props.label} value={field.value || ''} onChange={field.onChange}>
        {props.items.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
};

SelectInput.displayName = 'SelectInput';

export default SelectInput;
