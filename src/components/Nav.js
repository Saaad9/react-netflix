import React, {useEffect, useState} from 'react'
import './Nav.css';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            // console.log(window.scrollY);
            if (window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        })   

        return () => {
            window.removeEventListener('scroll', () => {});
        }
    }, []);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    }



    return (
        <nav className={`nav ${show ? "nav_black" : "" }`}>
            <img
                src='/assets/netflix-logo.svg'
                alt='Netflix logo'
                className='nav_logo'
                onClick={() => window.location.reload()}
            ></img>
            <input
                value={searchValue}
                onChange={handleChange}
                placeholder='영화를 검색해주세요'
                type='text'
                className='nav_input'
            ></input>
            <img
                alt="User logged"
                src='/assets/user-avatar.png'
                className='nav_avatar'
            ></img>
        </nav>
    )
}
