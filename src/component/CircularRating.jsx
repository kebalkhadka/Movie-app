import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

const CircularRating = ({ vote_average }) => {
  const normalizedRating = vote_average ? (vote_average / 10) * 100 : 0;

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      {/* CircularProgress with increased size and thickness */}
      <CircularProgress
        variant="determinate"
        value={normalizedRating}
        size={80}  // Increase the size
        thickness={6}  // Make it thicker
        style={{ color: 'green' }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Display the rating in the center */}
        <Typography
          variant="caption"
          component="div"
          style={{
            fontSize: '1.5rem',
            color: 'white',
          }}
          fontWeight="bold"  // Use MUI prop for bold font weight
        >
          {vote_average ? vote_average.toFixed(1) : 'N/A'}
        </Typography>
      </div>
    </div>
  );
};

export default CircularRating;
