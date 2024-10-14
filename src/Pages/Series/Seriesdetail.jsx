import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import CircularRating from '../../component/CircularRating';
import './Seriesdetail.css'

const Seriesdetail = () => {
  const { id } = useParams();
  const [SeriesDetail, setSeriesDetail] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const [writer, setWriter] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeriesDetail = async () => {
      try {
        console.log(`Fetching Series with ID: ${id}`);
  
        // Fetch series details
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=882a8de2ab02bad8c607b4a64e51f81a`);
        if (!response.ok) {
          throw new Error(`Series not found (status: ${response.status})`);
        }
        const data = await response.json();
        setSeriesDetail(data);
  
        // Fetch cast and crew
        const castResponse = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=882a8de2ab02bad8c607b4a64e51f81a`);
        if (!castResponse.ok) {
          throw new Error(`Credits not found (status: ${castResponse.status})`);
        }
        const castData = await castResponse.json();
        setCast(castData.cast);

        // Find the director and writer from the crew data
        const directorData = castData.crew.find((member) => member.job === 'Director');
        const writerData = castData.crew.find((member) => member.job === 'Writer');
        setDirector(directorData ? directorData.name : 'N/A'); // Set director's name if available
        setWriter(writerData ? writerData.name : 'N/A'); // Set writer's name if available
      } catch (e) {
        console.log("Error found", e);
        setError(e.message);
      }
    };
  
    fetchSeriesDetail();
  }, [id]);
  

  if (error) {
    return <div>Error: {error}</div>; // Display the error message
  }

  if (!SeriesDetail) {
    return (
      <div>
        <Skeleton variant="text" width="60%" height={40} />
        <Skeleton variant="rectangular" width="100%" height={300} />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="rectangular" width="100%" height={40} />
      </div>
    );
  }

  return (
    <div className='Seriesdetails'>
      <div className="content">
        <div className='left'>
          <img
            src={`https://image.tmdb.org/t/p/w500${SeriesDetail.poster_path}`}
            alt={SeriesDetail.title}
            className='banner'
          />
        </div>
        <div className='right'>
          <h1>{SeriesDetail.name}</h1>
          <div className="genres">
            {SeriesDetail.genres && SeriesDetail.genres.map((genre) => (
              <button key={genre.id}>{genre.name}</button>
            ))}
          </div>
          
          {/* Use CircularRating to display vote_average */}
          <div className="rating">
            <CircularRating vote_average={SeriesDetail.vote_average} />
          </div>
          <div className='overview-title'>Overview</div>
          <div className='overview-description'>{SeriesDetail.overview}</div>

          {/* Status, Runtime, and Release Date */}
          <div className="Series-info">
            <p>
              <span className="label">Status:</span> 
              <span className="value">{SeriesDetail.status}</span>
            </p>
            <p>
              <span className="label">Runtime:</span> 
              <span className="value">{SeriesDetail.runtime} minutes</span>
            </p>
            <p>
              <span className="label">Release Date:</span> 
              <span className="value">{new Date(SeriesDetail.release_date).toDateString()}</span>
            </p>
          </div>
          <hr />
          {/* Director and Writer */}
          <div className='Director'><strong>Director:</strong> {director}</div>
          <hr />
          <div className='Writer'><strong>Writer:</strong> {writer}</div>
          <hr />
        </div>
      </div>

      {/* Cast section */}
      <div className='cast'>
        <h2>Cast:</h2>
        <div className="cast-container">
          <ul>
            {cast.map((actor) =>
              actor.profile_path ? (
                <li key={actor.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                  />
                  <span>{actor.name}</span>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Seriesdetail;
