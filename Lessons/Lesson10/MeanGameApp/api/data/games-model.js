const mongoose = require("mongoose")

const publisherSchema = new mongoose.Schema({
    name: {
        type: String
    },
    country: {
        type: String
    }
})

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        "default": Date.Now 
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
    publisher : publisherSchema,
    reviews: [reviewSchema]

})

mongoose.model("Game", gameSchema, "games")