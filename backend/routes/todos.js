const router = require('express').Router();
const {createTodo, getTodos, deleteTodo} = require('../controllers/todos');

router.post('/todo', createTodo); //Создание
router.get('/todo', getTodos); //Получение всех todos
router.delete('/todo/:todoId', deleteTodo) //Удалить todo

module.exports = router