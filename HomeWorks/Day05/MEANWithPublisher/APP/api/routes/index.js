const express = require("express")
const controllerGames = require("../controller/games.controller")
const controllerPublisher = require("../controller/publisher.controller")
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
 
    
     // publisher    
router.route("/games/:gameId/publisher")
     .get(controllerPublisher.publisherGetOne)

router.route("/games/:gameId/publisher")
     .post(controllerPublisher.publisherAddOne)

router.route("/games/:gameId/publisher")
     .delete(controllerPublisher.publisherDeleteOne)

router.route("/games/:gameId/publisher")
     .put(controllerPublisher.publisherUpdateOne)


module.exports = router;