import axios from "../../api/axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchPage.css";
import "../../components/MovieModal/MovieModal.css";
import { useDebounce } from "../../Hooks/useDebounce";
import useOnClickOutside from "../../Hooks/useOnClickOutside";

export default function SearchPage() {
  // const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null);

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  // console.log('useLocation() : ', useLocation());
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovies(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovies = async (debouncedSearchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${debouncedSearchTerm}`
      );
      console.log("request", request.data.results);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClick = (movie) => {
    console.log("movie.id : ", movie);
    setModalOpen(true);
    setMovieSelected(movie);
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className='movie' key={movie.id}>
                <div
                  onClick={() => handleClick(movie)}
                  className='movie__column-poster'
                >
                  <img
                    className='movie__poster'
                    src={movieImageUrl}
                    alt='movieImage'
                  ></img>
                </div>
              </div>
            );
          }
        })}
        {modalOpen && (
          <div>
            {modalOpen && (
              <div className='presentation'>
                <div className='wrapper-modal'>
                  <div className='modal' ref={ref}>
                    <span
                      onClick={() => setModalOpen(false)}
                      className='modal-close'
                    >
                      X
                    </span>

                    <img
                      src={`https://image.tmdb.org/t/p/original/${movieSelected.backdrop_path}`}
                      alt='modal__poster-img'
                      className='modal__poster-img'
                    ></img>

                    <div className='modal__content'>
                      <p className='modal__details'>
                        <span className='modal__user_perc'>100% for you</span>
                        {movieSelected.release_date
                          ? movieSelected.release_date
                          : movieSelected.first_air_date}
                      </p>

                      <h2 className='modal__title'>
                        {movieSelected.title
                          ? movieSelected.title
                          : movieSelected.name}
                      </h2>
                      <p className='modal__overview'>
                        평점 : {movieSelected.vote_average}
                      </p>
                      <p className='modal__overview'>
                        {movieSelected.overview}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    ) : (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>
            찾고자 하는 검색어 {debouncedSearchTerm}에 대한 결과가 없습니다.
          </p>
        </div>
      </section>
    );
  };

  return renderSearchResults();
}
