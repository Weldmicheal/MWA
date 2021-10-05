const mongoose = require("mongoose")

const Game = mongoose.model("Game")


getAll = function (req, res) {

    console.log("GET Games controller");
    let offset = 0;
    let count = 5;
    const maxCount = 10;

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
        res.status(400).json({ "Message": "QueryString offset and count should be numbers" })
    }

    Game.find().skip(offset).limit(count).exec(function (err, games) {
        if (err) {
            console.log("Error finding games");
            res.status(500).json(err)
            return
        } else {
            console.log("Found games", games.length)
            res.status(200).json(games)
        }
    })


}

getOne = function (req, res) {

    const gameId = req.params.gameId
    if (!mongoose.isValidObjectId(req.params.gameId)) {
        console.log("Invalid gameId");
        res.status(400).json({ "message": "Invalid gameId" })
        return
    }
    Game.findById(gameId).exec(function (err, game) {
        if (err) {
            console.log("Error finding game");
            res.status(500).json(err)
            return
        } else {
            if (!game) {
                console.log("GameId not Found");
                res.status(404).json({"message": "Game with given gameId not Found"})
            } else {
                console.log("Game Found");
                res.status(200).json(game)
            }
        }

    })

}


addOne = function(req, res){
    
    var newGame = {
        title: req.body.title,
        price: req.body.price
    }

    Game.create(newGame, function(err, result){
        if(err){
            console.log("Error creating a game");
            res.status(500).json(err)
        }else{
            console.log("Game created");
            res.status(201).json(result)
        }
    })
  
}

module.exports = {
    gamesGetAll: getAll,
    gamesGetOne: getOne,
    gamesAddOne : addOne
}