import React, { useEffect, useState } from 'react';
import Paginations from '../../component/pagination/Paginations';
import SingleContent from '../../component/SingleContent/SingleContent';
import AutoComplete from '../../component/Autocomplete'; // Import AutoComplete component
import './Series.css';

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);

  // Example genre options (replace this with your actual genre data)
  const genreOptions = [
    { id: 10759, name: 'Action & Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 18, name: 'Drama' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
    { id: 99, name: 'Documentary' },
    { id: 10751, name: 'Family' },
    { id: 10762, name: 'Kids' },
    { id: 9648, name: 'Mystery' },
    { id: 10763, name: 'News' },
    { id: 10764, name: 'Reality' },
  ];

  const fetchSeries = async (genres) => {
    try {
      let genreIds = genres.map((genre) => genre.id).join(',');

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=882a8de2ab02bad8c607b4a64e51f81a&page=${page}&with_genres=${genreIds}`
      );
      const data = await response.json();
      setContent(data.results);
      setNumOfPages(data.total_pages > 500 ? 500 : data.total_pages); // Max 500 pages
    } catch (e) {
      console.log('Error occurred', e);
    }
  };

  useEffect(() => {
    fetchSeries(selectedGenres); // Fetch series whenever selected genres or page changes
  }, [selectedGenres, page]);

  return (
    <div>
      <span className="pageTitle">Series</span>
      <div className="autocomplete">
      <AutoComplete options={genreOptions} 
      onChange={setSelectedGenres}
      className="autocomplete"
      />
      </div>

      <div className="series">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <Paginations setPage={setPage} numOfPages={numOfPages} />
    </div>
  );
};

export default Series;
