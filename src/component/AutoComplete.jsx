import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';

const AutoComplete = ({ options, onChange }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleChange = (event, value) => {
    setSelectedGenres(value);
    onChange(value); // Notify the parent component
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
            style: { color: 'white', cursor: 'pointer' }, // Set cursor to pointer
          }}
          sx={{
            backgroundColor: '#173D77', // Button-like background color
            borderRadius: '18px', // Rounded corners
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent', // Remove border
              },
              '&:hover fieldset': {
                borderColor: 'transparent', // Remove hover border
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent', // Remove focus border
                boxShadow: 'none', // Remove focus glow
              },
            },
            '& .MuiInputBase-input': {
              color: '#fff', // Set input text color
              fontWeight: 'bold',
              '&:focus': {
                outline: 'none', // Remove outline on focus
              },
            },
            '& .MuiAutocomplete-tag': {
              color: 'white', // Set tag color
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
          width: '300px', // Ensure dropdown matches input width
          '& li': {
            cursor: 'pointer', // Change cursor to pointer for options
          },
          '& li:hover': {
            backgroundColor: '#555', // Change background color on hover
          },
        },
      }}
    />
  );
};

export default AutoComplete;
