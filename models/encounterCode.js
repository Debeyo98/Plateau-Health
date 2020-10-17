const mongoose = require('mongoose')
const { Schema } = mongoose


const encounterCodeSchema = new Schema({
    encounterCode: {
        type: String
    }
    
})

module.exports = EncounterCode = mongoose.model('encounterCode', encounterCodeSchema)