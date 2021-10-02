const mongoose = require("mongoose")
require("./games-model")

const dbURL = "mongodb://localhost:27017/meanGames"

mongoose.connect(dbURL)

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected successfully to "+dbURL)
})

mongoose.connection.on("disconnected", function(){
    console.log("Mongoose disconnected");
})

mongoose.connection.on("error", function(err){
    console.log("Error in connection"+ err);
})

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by App termination(SIGINT)");
        process.exit(0)
    })
})

process.on("SIGTERM", function(){
    mongoose.close(function(){
        console.log("Mongoose disconnecte by App termination(SIGTERM)");
        process.exit(0)
    })
})

process.on("SIGUSR2", function(){
    mongoose.close(function(){
        console.log("Mongoose disconnected by App termination(SIGUSR2)");
        process.kill(process.pid, "SIGUSR2")
    }) 
})