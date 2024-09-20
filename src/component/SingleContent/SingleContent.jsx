import React from 'react';
import { useNavigate } from 'react-router-dom';
import { img_300 } from '../../config/config';
import { CircularProgress, Box, Typography } from '@mui/material';
import './SingleContent.css';

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  const navigate = useNavigate();
  const normalizedRating = vote_average ? (vote_average / 10) * 100 : 0;

  const handleClick = () => {
    navigate(media_type === 'tv' ? `/series/${id}` : `/movie/${id}`);
  };

  return (
    <div className="media" onClick={handleClick}>
      <div className="posterWrapper">
        <img 
          src={poster ? `${img_300}/${poster}` : 'https://via.placeholder.com/300x450.png?text=No+Image'} 
          alt={title} 
          className="poster" 
        />
        <Box
          position="absolute"
          left={10}
          bottom={-10}
          display="flex"
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
      </div>
      <h3 className="title">
        {title.length > 20 ? `${title.substring(0, 20)}...` : title}
      </h3>
      <span className="subTitle">
        {media_type === 'tv' ? 'TV Series' : 'Movie'}
        <span className="subTitle">{date}</span>
      </span>
    </div>
  );
};

export default SingleContent;
