const mongoose = require('mongoose');
const userID = require('../controller/defaultController');
const { Schema } = mongoose;


const reasonforComing = new Schema({
    reason: {
        type: String,
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    userID

})


module.exports = Reason = mongoose.model('reason', reasonforComing)