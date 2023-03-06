const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const {Error} = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
})

userSchema.statics.findUserByCredentials = function (email, password) {
    return this.findOne({email})
        .then((user) => {
            if (!user) {
                return Promise.reject(new Error('Неправильные почта или пароль'));
            }
            return bcrypt.compare(password, user.password)
                .then((matched) => {
                    if (!matched) {
                        return Promise.reject(new Error('Неправильные почта или пароль'))
                    }
                    return user
                })
        })
}

module.exports = mongoose.model('user', userSchema)