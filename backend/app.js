const express = require('express');
const bodyParser = require('body-parser');
const {PORT = 3001} = process.env;
const Auth = require('./middlewares/auth')
const app = express();
const mongoose = require('mongoose')
const routeUser = require('./routes/users')
const routeTodos = require('./routes/todos')
const cors = require('cors');
const {createUser, login} = require('./controllers/users')
app.use(bodyParser.json());                          //Импорт парсера
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://127.0.0.1:27017/mydb', {  //Подключение к БД
    useNewUrlParser: true,
});

const settingCors = {                               //Параметры cors
    origin: [
        'http://localhost:3000',
        'https://localhost:3000',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
    credentials: true,
};
app.use('*', cors(settingCors)); //Запуск cors
app.use('/signup', createUser); //Роут регистрации
app.use('/signin', login); //роут Авторизации
app.use(Auth, routeTodos) //Роуты todo
app.use(Auth,routeUser)  //Роуты пользователя

app.listen(PORT, () => {   //Запуск приложения по порту 3001
    console.log(`Порт сервера ${PORT}`);
    console.log('Сервер запущен');
});

