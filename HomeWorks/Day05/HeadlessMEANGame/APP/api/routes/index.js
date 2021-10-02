const express = require("express")
const controllerGames = require("../controller/games.controller")

const router = express.Router()

router.route("/games")
    .get(controllerGames.gamesGetAll)

router.route("/games/new")
     .post(controllerGames.gamesAddOne)

router.route("/games/:gameId")
     .get(controllerGames.gamesGetOne)

router.route("/games/:gameId")
     .delete(controllerGames.gamesDeleteOne)

router.route("/games/:gameId")
     .put(controllerGames.gamesUpdateOne)
     
router.route("/games/:gameId")
     .patch(controllerGames.gamesPatchOne)
 
module.exports = router;