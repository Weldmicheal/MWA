const express = require("express")
const controllerGames = require("../controller/games.controller")
const controllerPublisher = require("../controller/publisher.controller")
const controllerReviews = require("../controller/reviews.controller")

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

     // reviews
router.route("/games/:gameId/reviews")
     .get(controllerReviews.reviewsGetAll)

router.route("/games/:gameId/reviews/:reviewId")
     .get(controllerReviews.reviewsGetOne)
module.exports = router;