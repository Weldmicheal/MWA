const express = require("express")
const  mongoose  = require("mongoose")
const controllerGames = require("../controller/games.controller")
const controllerpublisher = require("../controller/publisher.controller")

const router = express.Router()

router.route("/games")
    .get(controllerGames.gamesGetALL)
router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne)

router.route("/games/new")
    .post(controllerGames.gamesAddOne)

router.route("/games/:gameId")
    .put(controllerGames.gamesUpdateOne)
    
router.route("/games/:gameId")
    .delete(controllerGames.gamesDeleteOne)


module.exports = router
