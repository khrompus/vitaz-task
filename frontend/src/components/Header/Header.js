import React, {useContext} from 'react'
import {Link} from "react-router-dom";
import './Header.css'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


function Header(props) {
    const currentUser = useContext(CurrentUserContext)
    return(
        <header className="header">
            <Link to="/" className="header__link">  {/*Ссылка на главную*/}
                <h1 className="header__title">ToDoS</h1>
            </Link>
            <div className='header__authorize-container'>
                <p className={props.isLoggedIn ? 'header__authorize-subtitle' : 'header__authorize-subtitle_hidden'}>{currentUser ? currentUser.email : ''}</p>
                <Link to={props.redirect} className='header__authorize' onClick={props.onRedirect}> {/*Управляемая ссылка : авторизация , регистрация, выход*/}
                    {props.text}
                </Link></div>



        </header>
    )
}

export default Header
