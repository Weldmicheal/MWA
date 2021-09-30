const express = require("express")
const games = require("../controller/games.controller")
const router = express.Router();

router.route("/games")
    .get(games.gamesGetAll)

router.route("/games/:gameId")
    .get(games.gamesGetOne)

router.route("/games/new")
    .post(games.gamesAddOne)

module.exports = router