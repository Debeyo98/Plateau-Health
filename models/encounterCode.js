const mongoose = require('mongoose')
const { Schema } = mongoose


const encounterCodeSchema = new Schema({
    encounterCode: {
        type: String,
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    expirationDate:{
        type:Number
    }


})


module.exports = EncounterCode = mongoose.model('encounterCode', encounterCodeSchema)