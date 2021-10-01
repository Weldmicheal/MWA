const mongoose = require("mongoose")
require("./games-model")
const dbURL = "mongodb://localhost:27017/meanGames"

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on("connected", function(){
    console.log("DB successfuly connected to " + dbURL );
})

mongoose.connection.on("disconnected", function(){
    console.log("DB disconnected");
})

mongoose.connection.on("error", function(err){
    console.log("There is error", err);
})

process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by app termination");
        process.exit(0)
    })
})

