const express = require("express")
const path = require("path")
const app= express()



app.set("port", 3000)

app.get("/", function(req, res){
    console.log("GET received")
    res.status(404).send("Received your GET request")
})

app.get("/json", function(req, res){
    console.log("JSON received")
    res.status(200).json({"jsonData": true})
})

app.get("/file", function(req, res){
    console.log("File received")
    console.log(__dirname)
    console.log("\\app11.js") // the \\ are for windows and it is / for mac, so we have to make this platfrom independent using path
    res.status(200).sendFile(path.join(__dirname, 'app11.js'))
})

const server = app.listen(app.get("port"), function(){
    console.log("Listening on", server.address().port)
})