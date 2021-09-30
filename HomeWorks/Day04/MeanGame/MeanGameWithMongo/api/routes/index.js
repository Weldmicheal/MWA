const express = require("express")
const controllerGames = require("../controller/games.controller")

const router = express.Router()

router.route("/games")
    .get(controllerGames.gamesGetAll)
    // .post(controllerGames.gamesAddOne)

    // router.route("/games/:gameId")
    // .get(controllerGames.gamesGetOne)
    
module.exports = router;