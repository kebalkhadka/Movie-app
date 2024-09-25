import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';

const AutoComplete = ({ options, onChange }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleChange = (event, value) => {
    setSelectedGenres(value);
    onChange(value); // Call the onChange prop to notify the parent component
  };

  return (
    <Autocomplete
      multiple
      disablePortal
      options={options}
      getOptionLabel={(option) => option.name}
      value={selectedGenres}
      onChange={handleChange}
      PopperComponent={(props) => (
        <Popper {...props} style={{ maxHeight: '200px', overflow: 'hidden' }} />
      )}
      sx={{ width: 300 }} // Width of the Autocomplete
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={selectedGenres.length === 0 ? 'Select Genre' : ''}
          InputProps={{
            ...params.InputProps,
            style: { color: 'white' },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
            '& .MuiAutocomplete-tag': {
              color: 'white',
            },
          }}
        />
      )}
      ListboxProps={{
        sx: {
          maxHeight: '200px', // Limit the height of the dropdown
          overflowY: 'scroll', // Enable vertical scrolling
          scrollbarWidth: 'none', // For Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Hide scrollbar for Chrome/Safari
          },
          width: '300px', // Ensure the dropdown matches the input field width
          '& li:hover': {
            backgroundColor: '#555', // Change background color on hover
          },
        },
      }}
    />
  );
};

export default AutoComplete;
