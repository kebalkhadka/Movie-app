import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';

const Moviedetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        // Log the ID being used for debugging
        console.log(`Fetching movie with ID: ${id}`);

        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=882a8de2ab02bad8c607b4a64e51f81a`);
        if (!response.ok) {
          throw new Error(`Movie not found (status: ${response.status})`);
        }
        const data = await response.json();
        setMovieDetail(data);

        const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=882a8de2ab02bad8c607b4a64e51f81a`);
        if (!castResponse.ok) {
          throw new Error(`Credits not found (status: ${castResponse.status})`);
        }
        const castData = await castResponse.json();
        setCast(castData.cast);
      } catch (e) {
        console.log("Error found", e);
        setError(e.message); // Set error message
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>; // Display the error message
  }

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
    <div>
      <h1>{movieDetail.title}</h1>
      <p>{movieDetail.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} alt={movieDetail.title} />

      {/* Display cast */}
      <h2>Cast:</h2>
      <ul>
        {cast.map((actor) => (
          actor.profile_path ? ( // Check if profile_path exists
            <div key={actor.id}>
              <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
              <li>{actor.name}</li>
            </div>
          ) : null // Don't display anything if no image
        ))}
      </ul>
    </div>
  );
};

export default Moviedetail;
