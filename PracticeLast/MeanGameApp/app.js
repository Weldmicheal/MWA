require("dotenv").config({"path":".env"})
const exp = require("constants")
const express = require("express")
require("./api/data/db")

const path = require("path")

const routes = require("./api/routes")

//require("./api/data/dbconnection").open()
const app = express()
if(isNaN(process.env.PORT)){
    process.env.PORT = 6000
}

process.env.PORT = process.env.PORT || 6000
app.set("port", process.env.PORT)




app.use(function(req, res, next){
    console.log(req.method, req.url)
   next()
})


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use("/node_modules",express.static(path.join(__dirname, "node_modules")))
app.use(express.static(path.join(__dirname, "public")))


app.use("/api", routes)


// app.get("/", function(req, res) {
//     console.log("GET received!")

//     res.status(200).sendFile(path.join(__dirname, "public", "index.html"))
// })

const server = app.listen(app.get("port"), function(){
    console.log("listening to port", server.address().port)
})