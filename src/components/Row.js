import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Row({ isLargeRow, title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null);
  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    // console.log(request.data.results);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className='row'>
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
        loop={true}
        breakpoints={{
          1378: {
            slidesPerView: 6,
            spaceBetween: 6,
          },
          998: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
          625: {
            slidesPerView: 4,
            spaceBetween: 4,
          },
          0: {
            slidesPerView: 3,
            spaceBetween: 3,
          },
        }}
      >
        <div id={id} className='row__posters'>
          {movies.map((movie) => (
            <SwiperSlide>
              <img
                key={movie.id}
                className={`row__poster ${
                  isLargeRow ? "row__posterLarge" : ""
                }`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
        {modalOpen && (
          <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
        )}
      </Swiper>
    </section>
  );
}
