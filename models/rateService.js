const mongoose = require('mongoose')
const { Schema } = mongoose


const rateServicesSchema = new Schema({
    rateService: {
        type: Number,
    }


})


module.exports = RateService = mongoose.model('rateService', rateServicesSchema)