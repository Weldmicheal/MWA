const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
    title:{
        type: String,
        required : true

    },
    price: {
        type: Number,
        required: true
    }
})

mongoose.model("Game", gameSchema, "games")