const mongoose = require("mongoose")

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    }
})

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
    },
    publisher : publisherSchema

})

mongoose.model("Game", gameSchema, "games")