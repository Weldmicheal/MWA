const express = require("express")
const controllerGames = require("../controller/games.controller")
const controllerPublisher = require("../controller/publisher.controller")
const controllerReviews = require("../controller/reviews.controller")
const controllerUsers = require("../controller/users.controller")
const router = express.Router()

router.route("/games")
    .get(controllerUsers.authenticate, controllerGames.gamesGetAll)

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

     // reviews
router.route("/games/:gameId/reviews")
     .get(controllerReviews.reviewsGetAll)

router.route("/games/:gameId/reviews/:reviewId")
     .get(controllerReviews.reviewsGetOne)

router.route("/games/:gameId/reviews")
     .post(controllerReviews.reviewsAddAll)

router.route("/games/:gameId/reviews/:reviewId")
     .delete(controllerReviews.reviewsDeleteOne)

router.route("/games/:gameId/reviews/:reviewId")
     .put(controllerReviews.reviewsUpdateOne)

router.route("/users/login")
     .post(controllerUsers.userLogin)

router.route("/users/register")
     .post(controllerUsers.addOneUser)

module.exports = router;