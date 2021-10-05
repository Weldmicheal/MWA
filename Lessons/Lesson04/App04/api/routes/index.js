const express = require("express")
const controllerGames = require("../controller/games-controller")

//const controllerGame
const router = express.Router()

router.route("/games")
    .get(controllerGames.gamesGetAll)

router.route("/games/new")
     .post(controllerGames.gamesAddOne)

 router.route("/games/:gameId")
     .get(controllerGames.gamesGetOne)
    
module.exports = router;