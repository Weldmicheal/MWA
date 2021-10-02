const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    GPA: {
        type: Number,
        required: true
    },
    courses: [courseSchema]
})

mongoose.model("Student", studentSchema, "students")