const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({

    content: {                                                              // Схема todo list
        type: String, required: true,
    }, creator: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true,
    }, private: {
        type: Boolean, required: true
    },
    created: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('todo', todoSchema)