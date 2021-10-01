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
        "default": Date.Now
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
            type:[Number],
            index:"2dsphere"
        }
    }
})

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    players: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    publisher: publisherSchema,
    reviews: [reviewSchema]
})

mongoose.model("Game", gameSchema, "games")