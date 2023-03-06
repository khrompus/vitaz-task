import React from "react";
import './Card.css'
import {useContext} from 'react'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
export default function Card (props) {
    const currentUser = useContext(CurrentUserContext)
    const data = props.todo
    const isOwn = data.creator._id === currentUser._id //Проверка на пользователя

    const date = data.created.split('T')[0]        //Фильтр даты
    const dateCreated = date.split('-').reverse().join('/')
    function handleDeleteTodo () {
        props.handleDeleteTodo(data)
    }
    const cardDeleteButtonClassName = (
        `${isOwn ? 'grid__delete-btn' : 'grid__delete-btn_disable'}`
    );
   //Шаблон карточки
    return (
        <div className='grid__items'>
            <p className='grid__text'>{data.content}</p>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteTodo} type='button'/>
            <div className='grid__owner'>
                <p className='grid__owner-name'>{data.creator.name}</p>
                <span className='grid__owner-create'>{dateCreated}</span>
            </div>
        </div>
    )
}