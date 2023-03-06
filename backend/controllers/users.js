const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/BadRequestError')
const NotFoundError = require('../errors/NotFoundError')

module.exports.createUser = (req, res) => {

    const {email, password, name} = req.body
    bcrypt.hash(password, 10).then((hash => User.create({name, email, password: hash})
        .then(user => res.send({data: user}))                                                                           //Создание пользователя с хэш паролем
        .catch(() => res.status(400).send({message: 'Произошла ошибка'}))))

};

module.exports.login = (req, res) => {                                                                                  //Авторизация
    const {email, password} = req.body

    return User.findUserByCredentials(email, password)
        .then((user) => {
            //Создание токена
            const token = jwt.sign({_id: user._id}, 'some-secret-key');
            res.send({token});
        })
        .catch((err) => {
            res
                .status(401)
                .send({message: err.message});
        });

};

module.exports.getUser = (req, res, next) => {                                                                          //Получение данных пользователя
    const {_id} = req.user;
    return User.findOne({_id})
        .then((user) => {
            if (!user) {
                throw new NotFoundError('Нет пользователя с таким id');
            }
            res.status(200).send(user);
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                next(new BadRequestError('Переданы некорректный данные'));
            }
            next(err);
        });
};
module.exports.updateUser = (req, res, next) => {                                                                       //Обновление данных пользователя
    const userId = req.user._id;
    return User.findByIdAndUpdate(
        userId,
        {name: req.body.name},
        {
            new: true,
            runValidators: true,
        },
    )
        .orFail(new NotFoundError('Пользователь по указанному _id не найден.'))
        .then((user) => res.status(200).send(user))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                const error = new BadRequestError('Переданы некорректные данные при обновлении профиля.');
                next(error);
            }
            next(err);
        });
};

