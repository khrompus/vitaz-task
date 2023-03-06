import React, {useState, useEffect} from 'react'
import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Header from '../Header/Header'
import Main from "../Main/Main";
import {register, login, getContent, getUser, sendProfile, sendTodo, getTodos, deleteTodo} from "../../utils/api";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Login from "../Login/Login";
import Register from '../Register/Register'
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import AddTodoPopup from "../AddTodoPopup/AddTodoPopup";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); //Стейт логина
    const [todo, setTodo] = useState([])    //Массив с задачами
    const [currentUser, setCurrentUser] = useState({}) //Контекст текущего пользователя
    const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false) //Стейт открытие/закрытие попапа редактирования пользователя
    const [isAddTodoPopupOpen, setAddTodoPopup] = useState(false) //Стейт открытие/закрытие попапа создания задач

    const closeAllPopups = () => {   //Закрытие всех попапов
        setEditProfilePopup(false);
        setAddTodoPopup(false);
    }

    const navigate = useNavigate();

    const handleTokenCheck = () => {           //Проверка токена
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token')
            if (token) {
                getContent(token).then((res) => {
                    if (res) {
                        setIsLoggedIn(true)
                        navigate('/')
                    }
                }).catch((err) => {
                    console.log('Ошибка при проверки токена', err)
                })
            }
        }

    }
    useEffect(() => {
        handleTokenCheck()
    }, [])


    useEffect(() => {    //Получение карточек
        getTodos()
            .then((res) => {
                setTodo(res.data)
            })
            .catch(err => {
                console.log('Ошибка при получении задач', err)
            })
    }, [])

    function handleSignIn(email, password) {
        return login(email, password).then((res) => {   //Хэндлер авторизации
            setIsLoggedIn(true)
            localStorage.setItem('token', res.token)
            navigate('/')
        }).catch((err) => {
            console.log('Произошла ошибка при авторизации', err)
        })
    }

    function handleRegister(name, email, password) {           //Хэндлер регистрации
        return register(name, email, password).then((res) => {
            if (res) {
                navigate('/sign-in')
            }
        }).catch((err) => {
            console.log('Ошибка при регистрации', err)
        })
    }

    function handleEditProfileClick() {        //Хэндлер открытия попапа изменения пользователя
        setEditProfilePopup(!isEditProfilePopupOpen)
    }

    function handleAddTodoClick() {           //Хэндлер открытия попапа создания задач
        setAddTodoPopup(!isAddTodoPopupOpen)
    }

    const handleTodoDelete = (todos) => {
        const todoId = todos._id ? todos._id : todo.find((item) => {
            return item.todos === todo.id;
        })._id;                                                 //Удаление задач
        deleteTodo(todoId)
            .then(() => {
                const newArray = todo.filter((item) => {
                    return item._id !== todos._id;
                });
                setTodo([...newArray]);
            })
            .catch((err) => {
                console.log(err)
            })
    }


    useEffect(() => {
        getUser()
            .then((res) => {
                setCurrentUser(res)

            })                                                       //Получение данных пользователя
            .catch(err => {
                console.log('Ошибка при получении данных', err)
            })
    }, [isLoggedIn])

    function handleUpdateUser(e) {   // Функция обновления данных пользователя
        sendProfile(e)
            .then((userData) => {
                setCurrentUser(userData)
                closeAllPopups();
            })
            .catch((err) => {
                console.log('Ошибка при загрузки данных', err)
            })
    }

    function handleTodoCreate(content, checked) {   //Создание карточек
        sendTodo(content, checked)
            .then((res) => {
                setTodo([res.data, ...todo])
                closeAllPopups()
            })
            .catch((err) => {
                console.log('Ошибка загрузки задания', err)
            })
        getTodos()
            .then((res) => {
                setTodo(res.data)
            })
            .catch(err => {
                console.log('Ошибка при получении задач', err)
            })
    }

    function handleSignOut() {  //Функция выхода
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        console.log(localStorage)
    }

    return (<div className="App">
        <CurrentUserContext.Provider value={currentUser}>   {/*Провайдер контекста пользователя*/}
            <Routes>

                <Route path='/sign-in' element={<> <Header redirect='/sign-up'  //Путь до авторизации
                                                           isLoggedIn={isLoggedIn}
                                                           text='Регистрация'/>
                    <Login authorize={handleSignIn}/> </>}/>

                <Route path="/sign-up" element={<>  <Header redirect="/sign-in"       //Путь до регистрации
                                                            isLoggedIn={isLoggedIn}
                                                            text="Войти"/>
                    <Register register={handleRegister}/></>}/>


                <Route path='/' element={<ProtectedRoute isLoggedIn={isLoggedIn}>     {/*Путь до главной страницы*/}
                    <>
                        <Header redirect='/'
                                isLoggedIn={isLoggedIn}
                                text='Выйти'
                                onRedirect={handleSignOut}
                                userInfo={currentUser}
                        />
                        <Main user={currentUser} handleDeleteTodo={handleTodoDelete} todo={todo}
                              handleAddTodo={handleAddTodoClick} handleProfileEdit={handleEditProfileClick}/>
                    </>
                </ProtectedRoute>}/>
                <Route path='/todo-created'
                       element={<ProtectedRoute isLoggedIn={isLoggedIn}> {/*Путь до главной с созданными карточками*/}
                           <>
                               <Header redirect='/'
                                       isLoggedIn={isLoggedIn}
                                       text='Выйти'
                                       onRedirect={handleSignOut}
                                       userInfo={currentUser}
                               />
                               <Main user={currentUser} handleDeleteTodo={handleTodoDelete} todo={todo}
                                     handleAddTodo={handleAddTodoClick} handleProfileEdit={handleEditProfileClick}/>
                           </>
                       </ProtectedRoute>}/>

                <Route path='/todo-my'
                       element={<ProtectedRoute isLoggedIn={isLoggedIn}> {/*Путь до главной с заданиями для себя*/}
                           <>
                               <Header redirect='/'
                                       isLoggedIn={isLoggedIn}
                                       text='Выйти'
                                       onRedirect={handleSignOut}
                                       userInfo={currentUser}
                               />
                               <Main user={currentUser} handleDeleteTodo={handleTodoDelete} todo={todo}
                                     handleAddTodo={handleAddTodoClick} handleProfileEdit={handleEditProfileClick}/>
                           </>
                       </ProtectedRoute>}/>

            </Routes>
            {/*Popups*/}
            <EditProfilePopup onUpdateUser={handleUpdateUser} onClose={closeAllPopups}
                              isOpen={isEditProfilePopupOpen}/>
            <AddTodoPopup isOpen={isAddTodoPopupOpen} onAddTodo={handleTodoCreate} onClose={closeAllPopups}/>
        </CurrentUserContext.Provider>


    </div>);
}

export default App;
