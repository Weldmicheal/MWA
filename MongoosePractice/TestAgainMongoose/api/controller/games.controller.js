//const dbConnection = require("../data/db")

const mongoose = require("mongoose")

const Game = mongoose.model("Game")

getAll = function(req, res){
    
    let offset = 0;
    let count = 6;

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