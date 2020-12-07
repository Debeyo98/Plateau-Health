const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    cloudinaryId:{
        type:String
    }
});

module.exports = {User1 : mongoose.model('user1', userSchema)}