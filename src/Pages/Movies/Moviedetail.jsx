import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import CircularRating from '../../component/CircularRating';
import './Moviedetail.css';

const Moviedetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const [writer, setWriter] = useState('Unknown'); // Only one writer
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        // Fetch movie details
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=882a8de2ab02bad8c607b4a64e51f81a`
        );
        if (!response.ok) throw new Error(`Movie not found (status: ${response.status})`);
        const data = await response.json();
        setMovieDetail(data);

        // Fetch cast and crew (credits)
        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=882a8de2ab02bad8c607b4a64e51f81a`
        );
        if (!castResponse.ok) throw new Error(`Credits not found (status: ${castResponse.status})`);
        const castData = await castResponse.json();
        
        setCast(castData.cast);

        // Extract the director and first writer from the crew
        const crew = castData.crew;
        const director = crew.find(person => person.job === 'Director');
        const firstWriter = crew.find(person => person.job === 'Writer' || person.department === 'Writing');

        setDirector(director ? director.name : 'Unknown');
        setWriter(firstWriter ? firstWriter.name : 'Unknown'); // Only one writer
      } catch (e) {
        setError(e.message);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (error) return <div>Error: {error}</div>;

  if (!movieDetail) {
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
    <div className='Moviedetails'>
      <div className="content">
        <div className='left'>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
            alt={movieDetail.title}
            className='banner'
          />
        </div>
        <div className='right'>
          <h1>{movieDetail.title}</h1>
          <div className="genres">
            {movieDetail.genres && movieDetail.genres.map((genre) => (
              <button key={genre.id}>{genre.name}</button>
            ))}
          </div>
          
          {/* Use CircularRating to display vote_average */}
          <div className="rating">
            <CircularRating vote_average={movieDetail.vote_average} />
          </div>
          <div className='overview-title'>Overview</div>
          <div className='overview-description'>{movieDetail.overview}</div>

          {/* Status, Runtime, and Release Date */}
          <div className="movie-info">
            <p>
              <span className="label">Status:</span> 
              <span className="value">{movieDetail.status}</span>
            </p>
            <p>
              <span className="label">Runtime:</span> 
              <span className="value">{movieDetail.runtime} minutes</span>
            </p>
            <p>
              <span className="label">Release Date:</span> 
              <span className="value">{new Date(movieDetail.release_date).toDateString()}</span>
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

export default Moviedetail;
