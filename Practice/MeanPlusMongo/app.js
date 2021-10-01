const exp = require("constants")
const express = require("express")

const path = require("path")

const routes = require("./api/routes")

require("./api/data/dbconnection").open()
const app = express()
app.set("port", 3000)


app.use(function(req, res, next){
    console.log(req.method, req.url)
    next()
})

app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({extended: false}))
app.use(express.json({extended: false}))

app.use("/api", routes)


// app.get("/", function(req, res) {
//     console.log("GET received!")

//     res.status(200).sendFile(path.join(__dirname, "public", "index.html"))
// })

const server = app.listen(app.get("port"), function(){
    console.log("listening to port", server.address().port)
})