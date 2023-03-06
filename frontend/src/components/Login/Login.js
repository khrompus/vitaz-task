import React, {useState} from 'react'
import './Login.css'

export default function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailHandler = (e) => {  //Управляемый компонент
        setEmail(e.target.value)
    }
    const passwordHandler = (e) => {    //Управляемый компонент
        setPassword(e.target.value)
    }

    function handleSubmit(e) {  //Submit
        e.preventDefault()
        props.authorize(email, password)
    }
    //Страница авторизации
    return (
        <section className="login">
            <h1 className="login__title">Вход</h1>
            <div className="login__container">
                <form name="login" onSubmit={handleSubmit} className="login__form">
                    <input id="email" name="email" onChange={e => emailHandler(e)} value={email} placeholder="Email"
                           type="email" className="login__input"/>
                    <input id="password" name="password" onChange={e => passwordHandler(e)} value={password}
                           placeholder="Пароль" type="password" className="login__input"/>
                    <button type="submit" className="login__submit">Войти</button>
                </form>
            </div>
        </section>
    )
}