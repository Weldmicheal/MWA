
const mongoose = require("mongoose")
const Game = mongoose.model("Game")

getAll = function (req, res) {

    let offset = 0;
    let count = 5;
    const maxCount = 10
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset)
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count)
        if (count > maxCount) {
            count = maxCount
        }
    }
    if (isNaN(offset) || isNaN(count)) {
        console.log("QueryString offset and Count should be numbers");
        res.status(400).json({ "message": "QueryString offset and Count should be numbers" })
        return
    }
    Game.find().skip(offset).limit(count).exec(function (err, games) {
        if (err) {
            console.log("Error finding games");
            res.status(500).json(err)
        } else {
            console.log("games retrieved");
            res.status(200).json(games)
        }

    })

}

getOne = function (req, res) {

    const gameId = req.params.gameId
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("\"" + gameId + "\" is invalid gameId");
        res.status(400).json({ "message": "\"" + gameId + "\" is invalid gameId" })
        return
    }
    Game.findById(gameId).exec(function (err, game) {
        if (err) {
            console.log("Error finding the game");
            res.status(500).json(err)
            return
        } else {
            if (game) {
                console.log("game found");
                res.status(200).json(game)
            } else {
                console.log("Game with this id not available");
                res.status(404).json({ "message": "Game with id \"" + gameId + "\" not available" })
            }

        }

    })

}

module.exports = {
    gamesGetAll: getAll,
    gamesGetOne: getOne
}