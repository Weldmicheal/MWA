const express = require("express")
const games = require("../controller/games.controller")

const router = express.Router()

router.route("/games")
    .get(games.gamesGetAll)
   



module.exports = router