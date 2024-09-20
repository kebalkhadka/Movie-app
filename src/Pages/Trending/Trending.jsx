import React, { useState } from 'react'
import { useEffect } from 'react'
import SingleContent from '../../component/SingleContent/SingleContent';
import './Trending.css'
import Paginations from '../../component/pagination/Paginations';


const Trending = () => {
    const [content,setContent]= useState([]);
    const [page,setPage]= useState(1);
    const fetchData = async () =>{
        try{
          const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=882a8de2ab02bad8c607b4a64e51f81a&page=${page}`);

           const {results} = await response.json();
          // console.log(results);
           setContent(results); 
        }
        catch(e){
            console.log("Error occured",e);
        }
    }
    useEffect(()=>{
        fetchData();
      },[page])
  return (
    <div>
      <span className='pageTitle'>Trending</span>
      <div className="trending" >
      {
        content && content.map((c)=>(
          <SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date|| c.release_date}
          media_type={c.media_type} vote_average={c.vote_average} />
        ))
      }         
      </div>
      <Paginations setPage={setPage}/>
    </div>
  )
}

export default Trending