const express = require("express")
const controllerGames = require("../controllers/games.controller")
const reviewsController = require("../controllers/reviews-controller")
const controllerReviews = require("../controllers/reviews-controller")
const router = express.Router()

router.route("/games")
    .get(controllerGames.gamesGetAll)
    // .post(controllerGames.gamesAddOne)

router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne)

router.route("/games/:gameId/reviews")
    .get(reviewsController.reviewsGetAll)

router.route("/games/:gameId/reviews/:reviewId")
    .get(reviewsController.reviewsGetOne)
module.exports = router;