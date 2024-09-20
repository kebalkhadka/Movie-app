import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';

const Seriesdetail = () => {
  const { id } = useParams();
  const [SeriesDetail, setSeriesDetail] = useState(null);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeriesDetail = async () => {
      try {
        // Log the ID being used for debugging
        console.log(`Fetching Series with ID: ${id}`);

        const response = await fetch(`https://api.theSeriesdb.org/3/Series/${id}?api_key=882a8de2ab02bad8c607b4a64e51f81a`);
        if (!response.ok) {
          throw new Error(`Series not found (status: ${response.status})`);
        }
        const data = await response.json();
        setSeriesDetail(data);

        const castResponse = await fetch(`https://api.theSeriesdb.org/3/Series/${id}/credits?api_key=882a8de2ab02bad8c607b4a64e51f81a`);
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
    <div>
      <h1>{SeriesDetail.title}</h1>
      <p>{SeriesDetail.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${SeriesDetail.poster_path}`} alt={SeriesDetail.title} />

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

export default Seriesdetail;
