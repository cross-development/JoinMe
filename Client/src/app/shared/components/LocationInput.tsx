import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import axios from 'axios';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { Box, debounce, List, ListItemButton, TextField, Typography } from '@mui/material';

type LocationInputProps<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T>;

const LocationInput = <T extends FieldValues>(props: LocationInputProps<T>) => {
  const { field, fieldState } = useController(props);

  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(field.value || '');
  const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);

  useEffect(() => {
    if (field.value && typeof field.value === 'object') {
      setInputValue(field.value.venue || '');
    } else {
      setInputValue(field.value || '');
    }
  }, [field.value]);

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query || query.length < 3) {
          return setSuggestions([]);
        }

        setLoading(true);

        try {
          const res = await axios.get<LocationIQSuggestion[]>(
            `${import.meta.env.VITE_AUTOCOMPLETE_URL}&q=${query}`,
          );

          setSuggestions(res.data);
        } catch (error) {
          console.log('error :>> ', error);
        } finally {
          setLoading(false);
        }
      }, 500),
    [],
  );

  const handleChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      field.onChange(e.target.value);

      await fetchSuggestions(e.target.value);
    },
    [fetchSuggestions, field],
  );

  const handleSelect = useCallback(
    (location: LocationIQSuggestion) => {
      const country = location.address.country;
      const city = location.address?.city || location.address?.town || location.address?.village;
      const venue = location.display_name.split(',').slice(0, -1).join(', ');
      const latitude = location.lat;
      const longitude = location.lon;

      setInputValue(location.display_name);
      field.onChange({ country, city, venue, latitude, longitude });

      setSuggestions([]);
    },
    [field],
  );

  return (
    <Box>
      <TextField
        {...props}
        fullWidth
        variant="outlined"
        value={inputValue}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        onChange={handleChange}
      />

      {loading && <Typography>Loading...</Typography>}

      {!!suggestions.length && (
        <List sx={{ border: 1 }}>
          {suggestions.map(suggestion => (
            <ListItemButton key={suggestion.place_id} divider onClick={() => handleSelect(suggestion)}>
              {suggestion.display_name}
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
};

LocationInput.displayName = 'LocationInput';

export default LocationInput;
