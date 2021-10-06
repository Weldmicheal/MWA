const express = require("express")
const mongoose = require("mongoose")

const Game = mongoose.model("Game")
getAll = function(req, res){

    console.log("hi");
    //const gameId = req.params.gameId

    
    let offset = 0
    let count = 5

    

    if(req.query && req.query.offset){
        offset = req.query.offset
    }
    if(req.query && req.query.count){
        offset = req.query.count
    }

    const maxCount = 10;
    if(count > maxCount){
        count = maxCount
    }
    Game.find().exec(function(err, games){
        if(err){
            console.log("errr ");
            res.status(500).json(err)
        }
        res.status(200).json(games)
    })
}

getOne = function(req, res){
    const gameId = req.params.gameId
    if(!mongoose.isValidObjectId(gameId)){
        console.log("game id invalid");
        res.status(400).json({"message": "game id invalid"})
        return
    }

    Game.findById(gameId).exec(function(err, game){
        if(err){
            res.status(500).json(err)
        }else{
            if(!game){
                res.status(404).json({"message": "game id not available"})
            }else{
                res.status(200).json(game)
            }
        }
    })
} 
addOne = function(req, res){
    newGame = {
        title: req.body.title,
        price: parseFloat( req.body.price)
    }
    Game.create(newGame, function(err, gamecreated){
        if(err){
            res.status(500).json(err)
            return
        }else{
            res.status(200).json(gamecreated)
        }
    })
}

updateOne = function(req, res){
    const gameId = req.params.gameId
    console.log("hhhhhhhhhhh");
    if(!mongoose.isValidObjectId(gameId)){
        console.log("invalid game id");
        res.status(400).json({"message": "invalid game id"})
        return
    }

    Game.findById(gameId).exec(function(err, game){
        if(err){
            res.status(500).json(err)
        }else{
            if(!game){
                res.status(404).json({"message": "game id not available"})
            }else{
                game.title = req.body.title
                game.price = parseFloat(req.body.price)

                game.save(function(err, updatedGame){
                    if(err){
                        res.status(500).json(err)
                    }else{
                        res.status(204).json()
                    }
                })
            }
        }
    })
}

deleteOne = function(req, res){
    const gameId = req.params.gameId

    if(!mongoose.isValidObjectId(gameId)){
        console.log("invalid game id");
        res.status(400).json({"message": "invalid game id"})
        return
    }
    Game.findByIdAndDelete(gameId, function(err, deleteg){
        if(err){
            res.status(500).json(err)
        }else{
            res.status(204).json()
        }
    })
}
module.exports = {
    gamesGetALL: getAll,
    gamesGetOne: getOne,
    gamesAddOne: addOne,
    gamesUpdateOne: updateOne,
    gamesDeleteOne: deleteOne
}