const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    price: {
        type: Number,
        required: true
    },
    minPlayers: Number,
    maxPlayers: Number,
    designers:[String],
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    minAge: {
        type: Number,
        required: true
    }

})

mongoose.model("Game", gameSchema, "games")