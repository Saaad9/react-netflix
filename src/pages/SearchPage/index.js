import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchPage.css';
import { useDebounce } from '../../Hooks/useDebounce';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  // console.log('useLocation() : ', useLocation());
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  
  let query = useQuery();
  const searchTerm = query.get('q');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if(debouncedSearchTerm){
      fetchSearchMovies(debouncedSearchTerm);
    }
  },[debouncedSearchTerm]);

  const fetchSearchMovies = async (debouncedSearchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${debouncedSearchTerm}`)
        console.log('request',request);
        setSearchResults(request.data.results);
    } catch (error) {
      console.log('error',error);
    }
  }

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map((movie) => {
          if(movie.backdrop_path !== null && movie.media_type !== 'person'){
            const movieImageUrl = 
            "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className='movie' key={movie.id}>
                <div onClick={() => navigate(`/${movie.id}`)} className='movie__column-poster'>
                  <img
                    className='movie__poster'
                    src={movieImageUrl}
                    alt='movie image'
                  ></img>
                </div>

              </div>
            )
          }
        })}
      </section>
    ) : (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>
              찾고자 하는 검색어 {debouncedSearchTerm}에 대한 결과가 없습니다.
          </p>
        </div>
      </section>
    )
  }

  return renderSearchResults();
}
