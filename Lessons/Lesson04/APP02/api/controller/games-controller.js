const mongoose = require("mongoose")

const Game = mongoose.model("Game")

const runGeoSerach = function(req, res){
    const lat = parseFloat(req.query.lat)
    const lng = parseFloat(req.query.lng)
    const maxDist = parseFloat(req.query.maxDist)|| 1000
    const minDist = parseFloat(req.query.minDist) || 0

    const query = {
        "publisher.location": {
            $near: {
                $geometry:{
                    type: "Point",
                    coordinates:[lng, lat]
                },
                $maxDistance: maxDist,
                $minDistance:minDist
            
            }
        }
    }

    Game.find(query).exec(function(err, games){
        console.log("Geo search");
        res.status(200).json(games)
    })
}

getAll = function (req, res) {

    console.log("GET Games controller");
    
    if(req.query && req.query.lng && req.query.lat){
        runGeoSerach(req, res)
        return
    }
    
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