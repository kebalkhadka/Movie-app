
import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const CircularRating = ({ vote_average }) => {
  const normalizedRating = vote_average ? (vote_average / 10) * 100 : 0;

  return (
    <Box
      position="relative"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      width={40}
      height={40}
      bgcolor="rgba(255, 255, 255, 1)"
      borderRadius="50%"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
    >
      <CircularProgress
        variant="determinate"
        value={normalizedRating}
        size={40}
        thickness={4}
        style={{ color: 'green' }}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          style={{
            fontSize: '0.65rem',
            color: 'black',
            fontWeight: 'bold',
          }}
        >
          {vote_average ? vote_average.toFixed(1) : 'N/A'}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularRating;
