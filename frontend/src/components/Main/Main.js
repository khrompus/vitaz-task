import React from 'react'
import './Main.css'
import {useContext} from 'react'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Card from '../Card/Card'
import {useNavigate} from "react-router-dom";

function Main(props) {
    const navigate = useNavigate()
    const href = window.location.href
    const mainHref = 'http://localhost:3000/'
    const createdHref = 'http://localhost:3000/todo-created'
    const myTodoHref = 'http://localhost:3000/todo-my'
    function handleNavigateCreated () { //Хэндлер навигации
        navigate('/todo-created')
    }
    function handleNavigateMyTodo () { //Хэндлер навигации
        navigate('/todo-my')
    }
    function handleNavigateMain () { //Хэндлер навигации
        navigate('/')
    }
    const currentUser = useContext(CurrentUserContext)

        //Главная страница
    return (
        <main>
            <section className='profile'>
                <div className='profile__container'>
                    <div className='profile__name'>
                        <h2 className='profile__title'>{currentUser.name}</h2>
                        <button className='profile__button-edit' onClick={props.handleProfileEdit} type='button'/>
                    </div>
                    <button className='profile__button-add' onClick={props.handleAddTodo} type='button'/>
                </div>
                <div className='profile__my-todo-container'>
                    <button className='profile__button-todo' onClick={handleNavigateMyTodo} type='button'>Мои задачи</button>
                    <button className='profile__button-todo' onClick={handleNavigateMain} type='button'>Главная</button>
                    <button className='profile__button-todo' onClick={handleNavigateCreated} type='button'>Созданные задачи</button>
                </div>
            </section>
            <section className='grid'>

                {props.todo.map((todo) => {
                    const isOwn = currentUser._id === todo.creator._id
                    if ((href === mainHref)&& todo.private === false){
                        return (
                            <Card handleDeleteTodo={props.handleDeleteTodo} todo={todo} key={todo._id}/>
                        )
                    } else if ((href === createdHref) && isOwn) {
                        return (
                            <Card handleDeleteTodo={props.handleDeleteTodo} todo={todo} key={todo._id}/>                //Проверка по url и рендер карточки
                        )
                    } else if ((href === myTodoHref) && (isOwn && todo.private)) {
                        return (
                            <Card handleDeleteTodo={props.handleDeleteTodo} todo={todo} key={todo._id}/>
                        )
                    }
                })}


            </section>
        </main>
    )

}

export default Main