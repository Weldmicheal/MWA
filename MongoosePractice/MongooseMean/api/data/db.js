const mongoose = require("mongoose")
require("./games-model")

const dbURL = process.env.PORT

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to " + dbURL)

})
mongoose.connection.on("disconnected", function(){
    console.log("Mongoose disconnected")
})
mongoose.connection.on("error", function(err){
    console.log("Mongoose connection error " + err)
})

// disconnect Mongoose

// process.on("SIGINT", function(){
//     mongoose.connection.close(function(){
//         console.log("Mongoose disconnected by app termination");
//         process.exit(0)
//     })
// })

// Terminate Mongoose

// process.on("SIGTERM", function(){
//     mongoose.connection.close(function(){
//         console.log("Mongoose disconnected by app termination");
//         process.exit(0)
//     })
// })

// // Restart Mongoose

// process.once("SIGUSR2", function(){
//     mongoose.connection.close(function(){
//         console.log("Mongoose disconnected by app termination");
//         process.kill(process.pid, "SIGUSR2")
//     })
// })