const mongoose = require("mongoose")



const olympicSchema = new mongoose.Schema({
    racing: {
        type: String,
        required: true
    },
    numPlayers: {
        type: Number,
        required: true
    },
    winningCountry: {
        type: String,
        required: true
    }
})

mongoose.model("Olympic", olympicSchema, "olymics")