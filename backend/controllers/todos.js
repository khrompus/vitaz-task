const Todo = require('../models/todo');
const NotFoundError = require('../errors/NotFoundError')
const BadRequestError = require('../errors/BadRequestError')

module.exports.createTodo = (req, res) => {
    const date = Date.now
    const {content, creator = req.user._id, checked} = req.body;
    Todo.create({created: date(), content, creator: creator, private: checked})
        .then(todo => res.send({data: todo}))                                       //Создание todo
        .catch(err => res.status(500).send({message: 'Произошла ошибка'}));

};


module.exports.deleteTodo = (req, res, next) => {
    Todo.findById(req.params.todoId)
        .orFail(new Error('NotValidId'))
        .then((todo) => {
            if (req.user._id.toString() === todo.creator.toString()) {
                todo.deleteOne();                                                    //Удаление todo
                res.status(200).send({ message: 'Задача удалена!' });
            }
        })
        .catch((err) => {
            if (err.message === 'NotValidId') {
                next(new NotFoundError('Задача с указанным _id не найдена'));
            }
            if (err.kind === 'ObjectId') {
                next(new BadRequestError('Невалидный id'));
            }

            next(err);
        });
};


module.exports.getTodos = (req, res) => {
    Todo.find({})
        .populate('creator')
        .then(todo => res.send({data: todo}))                              //Поиск всех todo
        .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
};