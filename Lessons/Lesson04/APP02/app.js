require("dotenv").config({ "path": ".env" })
const exp = require("constants")
const express = require("express")
require("./api/data/db")
const path = require("path")

const routes = require("./api/routes")

//console.log("PORT from env is", process.env.PORT);

const app = express()
if (isNaN(process.env.PORT)) {
    process.env.PORT = 6000

}
process.env.PORT = process.env.PORT || 6000
app.set("port", process.env.PORT)


app.use(function (req, res, next) {
    console.log(req.method, req.url)
    next()
})

app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({ extended: false }))
app.use(express.json({ extended: false }))

app.use("/api", routes)


const server = app.listen(app.get("port"), function () {
    console.log("listening to port", server.address().port)
})