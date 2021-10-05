const exp = require("constants")
const express = require("express")
require("./api/data/db")

const path = require("path")

const routes = require("./api/routes")
const app = express()
app.set("port", 3000)


app.use(function(req, res, next){
    console.log(req.method, req.url)
    next()
})


app.use(express.urlencoded({extended: false}))
app.use(express.json({extended: false}))

app.use("/api", routes)

const server = app.listen(app.get("port"), function(){
    console.log("listening to port", server.address().port)
})