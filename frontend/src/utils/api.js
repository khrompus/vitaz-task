import {baseUrl} from "./constants";

const parseResponse = (response) => {
    if (response.ok) {
        return response.json();

    }
    return Promise.reject(new Error(`Ошибка ${response.status}`));
};

const register = (name, email, password) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },                                                                                                              //Регистрация
        body: JSON.stringify({name, email, password})
    })
        .then((response) => parseResponse(response))
}

const login = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })                                                                                                                  //Авторизация
        .then((response) => {
        return parseResponse(response)
        })
}

const getContent = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,                                                                           //Проверка токена
        },
        credentials: "include",
    })
        .then(res => parseResponse(res))
};

const getUser = () => {
    return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",                                                                         //Получение данных пользователя
        },
    })
        .then(res => parseResponse(res));
}

const sendProfile = ({name}) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
},                                                                                                                      //изменение данных пользователя
        body: JSON.stringify({
            name: name
        })
    })
        .then(res => parseResponse(res))
}

const sendTodo = ({content, checked}) => {
    return fetch(`${baseUrl}/todo`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }, body:JSON.stringify({                                                                                  //Создание задач
            content: content,
            checked: checked
        })
    })
        .then(res => parseResponse(res));
}
const getTodos = () =>
    fetch(`${baseUrl}/todo`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('token')}`,                                               //Получения массива задач
        },
    }).then((response) => parseResponse(response));

const deleteTodo = (todoId) => {
    return fetch(`${baseUrl}/todo/${todoId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,                                               //Удаление задач
            'Content-Type': 'application/json'
        }
    })
        .then(res =>  parseResponse(res));
}

export {
    register,
    login,
    getContent,
    getUser,
    sendProfile,
    sendTodo,
    getTodos,
    deleteTodo
}