import React, { useEffect, useState } from 'react'
import requests from '../api/requests';
import axios from '../api/axios';
import './Banner.css';
export default function Banner() {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])


    
    const fetchData = async () => {
        //현재 상영 중인 영화 정보를 가져오기(여러 영화)
        const request = await axios.get(requests.fetchNowPlaying);

        // 여러 영화 중 하나의 ID를 가져오기
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id;

        // 특정 영화의 더 상세한 정보를 가져오기(비디오 정보 포함)
        // 명시적으로 data : 붙여주나봄 ..? => XXXXX,  data : 빠지면 안됨
        // Axios의 응답객체에서 data 속성만 구조 분해 한것이라고 함
        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
            // append_to_response 는 받아오는 응답에 비디오를 추가해달라는 뜻이라고 함..
            params: { append_to_response: "videos" },
        });
        setMovie(movieDetail);
    }

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    if (!isClicked) {     
        return (
            <header
                className='banner'
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                }}
            >
                <div className='banner__contents'>
                    {/* movie 타이틀이 없다면 name, name이 없다면 original_name */}
                    <h1 className='banner__title' >{movie.title || movie.name || movie.original_name}</h1>
    
                    <div className='banner_buttons'>
                        <button className='banner_button play' onClick={() => setIsClicked(true)}>Play</button>
                        <button className='banner_button info'>More Information</button>
                    </div>
    
                    <h1 className='banner__description'>{truncate(movie.overview, 100)}</h1>
                </div>
                <div className='banner_fadeBottom'/>
            </header>
        )
    } else {
        return (
            <div className='container'>
                <div className='home_container'>
                <iframe 
                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
                    ?controls=0&autoplay=1&loop=1&mute=0&playlist=${movie.videos.results[0].key}`}
                    className='iframe'
                    width="640" 
                    height="360" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="autoplay; fullscreen" 
                ></iframe>

                </div>
                
            </div>
        )
    }

}
