const mongoose = require('mongoose')
const { Schema } = mongoose


const bookserviceSchema = new Schema({
    bookserviceCode: {
        type: String
    }
    
})

module.exports = BookserviceCode = mongoose.model('bookserviceCode', bookserviceSchema)