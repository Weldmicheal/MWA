const express = require("express")

const path = require("path")

const app = express()
app.set("port", 3000)

app.use(express.static(path.join(__dirname, "public")))

// app.get("/", function(req, res) {
//     console.log("GET received!")

//     res.status(200).sendFile(path.join(__dirname, "public", "index.html"))
// })

const server = app.listen(app.get("port"), function(){
    console.log("listening to port", server.address().port)
})