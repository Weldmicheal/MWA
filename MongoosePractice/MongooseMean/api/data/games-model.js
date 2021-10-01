// Add Schema

const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
})

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: Number,
        required: true
    },
    established: {
        type: Date,
        required: false
    },
    location: {
        address: String,
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    }
})

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: Number,
    designers: [String],
    players: {
        type: Number,
        min: 1,
        max: 10
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default":1
    },
    reviews:[reviewSchema],
    publisher: publisherSchema
})



mongoose.model("Game", gameSchema, "games")
