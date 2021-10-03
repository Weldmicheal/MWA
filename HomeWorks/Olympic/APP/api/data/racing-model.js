const mongoose = require("mongoose")

const countrySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    numPlayers:{
        type: Number,
        required: true
    }
})

const racingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    numPlayers: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    countries : [countrySchema]
})

mongoose.model("Racing", racingSchema, "races")