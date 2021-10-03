const mongoose = require("mongoose")


const sportsSchema = new mongoose.Schema({
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
    }
})

const olympicsSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    sports:[sportsSchema]
})




mongoose.model("Olympics", olympicsSchema, "olympics")