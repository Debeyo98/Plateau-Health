const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
})

module.exports = User = mongoose.model('user', userSchema)