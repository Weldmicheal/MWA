const express = require("express")

const app = express()

app.set("port", 3000)

app.use(function(req, res, next){
    console.log(req.method, req.url)
})

const server = app.listen(app.get("port"), function(){
    console.log("Listening on: ", server.address().port)
})

console.log("hello")