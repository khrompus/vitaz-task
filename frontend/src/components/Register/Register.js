import React from 'react'
import './Register.css'
import {useState} from 'react'
import {Link} from "react-router-dom";


export default function Register(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const emailHandler = (e) => { //Управляемый компонент
        setEmail(e.target.value)
    }
    const nameHandler = (e) => { //Управляемый компонент
        setName(e.target.value)
    }
    const passwordHandler = (e) => { //Управляемый компонент
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => { //submit
        e.preventDefault();
        props.register(name, email, password)
    }

        //Страница регистрации
    return (<section className="register">
        <h1 className="register__title">Регистрация</h1>
        <div className="register__container">
            <form className="register__form" onSubmit={handleSubmit} name="register-form">
                <input className="register__input" value={name} id="email" onChange={e => nameHandler(e)}
                       name="name" placeholder="Name" type="name"/>
                <input className="register__input" value={email} id="email" onChange={e => emailHandler(e)}
                       name="email" placeholder="Email" type="email"/>
                <input className="register__input" id="password" value={password} onChange={e => passwordHandler(e)}
                       name="password" placeholder="Пароль" type="password"/>
                <button className="register__submit" type="submit">Зарегистрироваться</button>
            </form>
            <h2 className="register__subtitle">Уже зарегистрированы? <Link to='/sign-in'
                                                                           className="register__subtitle_underline">Войти</Link>
            </h2>
        </div>
    </section>)
}