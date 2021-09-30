const express = require("express")
const { route } = require("../../../MEANwithBusinessLogic/api/routes")
const games = require("../controller/games.controller")

const router = express.Router()

router.route("/games")
    .get(games.gamesGetAll)

router.route("/games/new")
    .post(games.gamesAddOne)


router.route("/games/:gameId")
    .get(games.gamesGetOne)


module.exports = router