const mongooes = require('mongoose');

const userSchmea = mongooes.Schema({
    name: {
        type: String,
        require: true
    },
    mail: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongooes.model('user', userSchmea);