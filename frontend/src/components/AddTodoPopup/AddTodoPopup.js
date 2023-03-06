import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React, {useState} from "react";
import './AddTodoPopup.css'

export default function AddTodoPopup(props) {
    const [content, setContent] = useState('')
    const [checked, setChecked] = useState(false)

    function handleChangeContent(e) {
        setContent(e.target.value)
    }
    function handleChangeCheckbox() {
        setChecked(!checked)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddTodo({
            content,
            checked
        });
    }
// Попап создания задач
    return (<PopupWithForm onSubmit={handleSubmit} buttonText='Создать' name="popupAddCard" onClosePopup={props.onClose}
                           isOpen={props.isOpen}
                           id="popupAddCard" title="Новая задача" idForm="addTodoForm">
            <textarea placeholder='Новая задача'  value={content || ''} onChange={handleChangeContent} className='popup__area' type='text'
                      name='todo-text' id='newTodo'/>
        <div>
            <input className='popup__checkbox' type="checkbox" checked={checked} onChange={handleChangeCheckbox}/>
            <span className='popup__span'>Private</span>
        </div>
    </PopupWithForm>)
}