const mongoose = require("mongoose")
require("./games-model")


const dbURL = process.env.DATABASE_URL + process.env.DATABASE_NAME

mongoose.connect(dbURL)

mongoose.connection.on("connected", function(){
    console.log("DB connected");
})
mongoose.connection.on("disconnected", function(){
    console.log("DB disconnected");
})
mongoose.connection.on("error", function(err){

    console.log("DB err", err);
})

process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log("DB disconnected on app termination");
        process.exit(0)
    })
   
})

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("DB disconnected on app termination");
        process.exit(0)
    })
  
})
process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log("DB disconnected on app termination");
        process.kill(process.pid, "SIGUSR2")
    })
})