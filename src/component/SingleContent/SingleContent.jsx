import React from 'react';
import { useNavigate } from 'react-router-dom';
import CircularRating from '../CircularRating';
import './SingleContent.css';

// Define the base URL for image posters
const img_300 = 'https://image.tmdb.org/t/p/w300';

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(media_type === 'tv' ? `/series/${id}` : `/movie/${id}`);
  };

  return (
    <div className="media" onClick={handleClick}>
      <div className="posterWrapper">
        <img 
          src={poster ? `${img_300}${poster}` : 'https://via.placeholder.com/300x450.png?text=No+Image'} 
          alt={title} 
          className="poster" 
        />
        {/* Use CircularRating */}
        <CircularRating vote_average={vote_average} />
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
