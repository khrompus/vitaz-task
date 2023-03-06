import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {useState} from 'react'
import React from "react";
import './EditProfilePopup.css'

export default function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);


    const [name, setName] = useState('')
    React.useEffect(() => {
        setName(currentUser.name);
    }, [currentUser , props.isOpen]);

    function handleChangeName(e) {  //Управляемый компонент
        setName(e.target.value)
    }

    function handleSubmit(e) {  //submit
        e.preventDefault();
        props.onUpdateUser({
            name
        });
    }
 //Попап изменения данных пользователя
    return (
        <PopupWithForm onSubmit={handleSubmit} buttonText='Сохранить' name="popupEdit" onClosePopup={props.onClose}
                       isOpen={props.isOpen}
                       id="popupEdit"
                       title="Редактировать профиль" idForm="editForm">
            <input placeholder="Имя" onChange={handleChangeName} value={name || ''}
                   className="popup__input popup__input_type_first-name" id="firstName"
                   type="text"
                   name="name" required minLength="2" maxLength="40"/>
        </PopupWithForm>

    )

}