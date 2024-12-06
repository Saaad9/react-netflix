import React, {useEffect, useState} from 'react'
import './Nav.css';

export default function Nav() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            console.log(window.scrollY);
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



    return (
        <nav className={`nav ${show ? "nav_black" : "" }`}>
            <img
                src='/assets/netflix-logo.svg'
                alt='Netflix logo'
                className='nav_logo'
                onClick={() => window.location.reload()}
            ></img>
            <img
                alt="User logged"
                src='/assets/user-avatar.png'
                className='nav_avatar'
            ></img>
        </nav>
    )
}
