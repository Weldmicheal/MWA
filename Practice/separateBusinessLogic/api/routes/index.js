const express = require("express")
const games = require("../controller/games.controller")

const router = express.Router()

router.route("/json")
    .get(games.gamesGetAll)
    .post(games.gamesAddOne)


module.exports = router