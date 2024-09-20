import { Pagination } from '@mui/material';
import React from 'react';

const Paginations = ({ setPage, numOfPages = 10 }) => {
  const handlePageChange = (event, value) => {
    setPage(value); // Use the value directly provided by MUI
    window.scroll(0, 0); // Scroll to the top after page change
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Pagination
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'white', // Page item color
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: 'grey', // Selected page background color
            color: 'white',
          },
        }}
        count={numOfPages} // Total number of pages
        onChange={handlePageChange}
        hidePrevButton={numOfPages === 1} // Hide 'previous' button if only one page
        hideNextButton={numOfPages === 1} // Hide 'next' button if only one page
      />
    </div>
  );
};

export default Paginations;
