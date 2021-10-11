const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({
    city: {
        type: String
    },
    zipCode: {
        type: Number
    },
    state: {
        type: String 
    },
    country: {
        type: String
    }
})

const jobSchema = new mongoose.Schema({
    title: {
        type: String
    },
    salary: {
        type: Number
    },
    postDate : {
        type: Date
    },
    skills:[String],
    exprience: String,
    
    description: {
        type: String
    },
    
    location: {
        type: {
            type: String
        },
        coordinates:{
            type:[Number],
            index:"2dsphere"
        }
        
    },
    
    locations: [locationSchema]

})

mongoose.model("Job", jobSchema, "jobs")