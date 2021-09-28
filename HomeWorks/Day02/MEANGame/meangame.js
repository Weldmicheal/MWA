const express = require("express")

const path = require("path")

const app = express()
app.set("port", 3000)

app.use(function(req, res, next){
    console.log(req.method, req.url)
    next()
})

app.use(express.static(path.join(__dirname, "public")))

const server = app.listen(app.get("port"), function(){
    console.log("listening to port", server.address().port)
})