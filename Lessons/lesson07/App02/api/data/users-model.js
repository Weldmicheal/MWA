const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    name: String
})



mongoose.model("User", userSchema, "users")