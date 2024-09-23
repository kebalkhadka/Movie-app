import React, { useEffect, useState } from 'react'
import Paginations from '../../component/pagination/Paginations';
import SingleContent from '../../component/SingleContent/SingleContent';
import './Series.css'

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSeries = async () => {
    try {
      if (page > 500) {
        setPage(500);
        return;
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=882a8de2ab02bad8c607b4a64e51f81a&page=${page}`
      );
      const data = await response.json();
      console.log(data);

      setContent(data.results);
      setNumOfPages(data.total_pages > 500 ? 500 : data.total_pages); // Set to a max of 500 pages
    } catch (e) {
      console.log('Error occurred', e);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, [page]); // Correct dependency array

  return (
    <div>
      <span className="pageTitle">Series</span>
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
