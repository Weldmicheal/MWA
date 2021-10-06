require("dotenv").config({"path":".env"})
require("./api/data/db")
const routes = require("./api/routes")
const express = require("express")

const app = express()

app.use(function(req, res, next){
    console.log(req.method, req.url);
    next()
})

app.set("port", process.env.PORT)

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))

app.use("/api", routes)



const server = app.listen(app.get("port"), function(){
    const port = server.address().port
    console.log("Listeninng on ", port);
})