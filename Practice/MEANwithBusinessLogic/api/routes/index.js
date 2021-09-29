const express = require("express")
const games = require("../controller/games.controller")

const router = express.Router()

router.route("/games")
    .get(games.gamesGetAll)
    .post(games.gamesAddOne)


router.route("/games/:gameId")    
    .get(games.gamesGetOne)
module.exports = router