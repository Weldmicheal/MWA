//const dbConnection = require("../data/db")

const mongoose = require("mongoose")

const Game = mongoose.model("Game")

const runGeoQuery = function(req, res){
    const lng = parseFloat(req.query.lng)
    const lat = parseFloat(req.query.lat)
    console.log("Geo search lng ", lng, " lat ", lat);

    const query = {
        "publisher.location": {
            $near: {
                $gemoetry: {
                    type: "Point",
                    coordinates: {lng, lat}
                },
                $maxDistance: 1000, // or 1000000
                $minDistance: 0
            }
        }
    }
    Game.find(query).exec(function(err, games){
        if(err){
            console.log("Error ", err);
        }
        console.log("Found games", games);
        res.status(200).json(games)
    })
}

getAll = function(req, res){
    
    let offset = 0;
    let count = 6;
    
    if(req.query && req.query.lat && req.query.lng){
        runGeoQuery(req, res)
        return
    }

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset)
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count)
       
    }

    Game.find().skip(offset).limit(count).exec(function(err, games){
        res.status(200).json(games)
    })

}

getOne = function(req, res){
    const gameId = req.params.gameId

    Game.findById(gameId).exec(function(err, game){
        res.status(200).json(game)
    })
}

module.exports = {
    gamesGetAll : getAll,
    gamesGetOne : getOne
}