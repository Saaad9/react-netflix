import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios';

export default function DetailPage() {
  const {movieId} = useParams();
  const [movie, setMovie] = useState({});
  console.log(movieId);
  console.log("movie : ", movie);

  useEffect(() => {
    async function fecthData() {
      const request = await axios.get(
        `/movie/${movieId}`
      )
      console.log('request data @@@@@ :',request.data)
      setMovie(request.data);
    }
    fecthData();
  },[])

  if(!movie) return <div>...loading</div>;

  return <section>
    
    <img
      className='modal__poster-img'
      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
      alt='poster'
    ></img>
  </section>
}