const mongoose = require("mongoose")

const Game = mongoose.model("Game")

const _addPublisher = function(req, res, game){


    game.publisher = {name: req.body.nema, country: req.body.country}

    game.save(function(err, updatedGame){
        if(err){
            console.log("Error deleting publisher");
            res.status(500).json(err)
            return
        }else{
            res.status(201).json(updatedGame.publisher)
        }
    })
}

const _deletePublisher = function(req, res, game){
    game.publisher = null
    game.save(function(err, updatedGame){
        if(err){
            console.log("Error adding publisher");
            res.status(500).json(err)
            return
        }else{
            res.status(201).json(updatedGame)
        }
    })
}


const _updatePublisher = function(req, res, game){
    game.publisher = {name: req.body.name, country: req.body.country}
    game.save(function(err, updatedGame){
        if(err){
            console.log("Error updating publisher");
            res.status(500).json(err)
            return
        }else{
            res.status(201).json(updatedGame)
        }
    })
}

getOne = function(req, res){
    const gameId = req.params.gameId
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("\"" + gameId + "\" is invalid gameId");
        res.status(400).json({ "message": "\"" + gameId + "\" is invalid gameId" })
        return
    }else{
        Game.findById(gameId).select("publisher").exec(function(err, response){
            if(err){
                console.log("Error finding game");
                res.status(500).json(err)
                return
            }else{
                const _publisher = response.publisher
                if(!_publisher){
                    console.log("No publisher");
                    res.status(404).json({"message": "No publisher found"})
                }else{
                    res.status(200).json(response.publisher)

                }
            }
        })
    }
}

addOne = function(req, res){    

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
            if (!game) {
                console.log("Game with this id not available");
                res.status(404).json({ "message": "Game with id \"" + gameId + "\" not available" })
                return                
            } else {
                console.log("game found");
                _addPublisher(req, res, game)
            }

        }

    })
}

deleteOne = function(req, res){
    const gameId = req.params.gameId
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("\"" + gameId + "\" is invalid gameId");
        res.status(400).json({ "message": "\"" + gameId + "\" is invalid gameId" })
        return
    }else{
        Game.findById(gameId).exec(function (err, game) {
            if (err) {
                console.log("Error finding the game");
                res.status(500).json(err)
                return
            } else {
                if (!game) {
                    console.log("Game with this id not available");
                    res.status(404).json({ "message": "Game with id \"" + gameId + "\" not available" })
                    return                
                } else {
                    console.log("game found");
                    _deletePublisher(req, res, game)
                }
    
            }
    
        }) 

    }
}

updateOne = function(req, res){
    const gameId = req.params.gameId
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("\"" + gameId + "\" is invalid gameId");
        res.status(400).json({ "message": "\"" + gameId + "\" is invalid gameId" })
        return
    }else{
        Game.findById(gameId).exec(function (err, game) {
            if (err) {
                console.log("Error finding the game");
                res.status(500).json(err)
                return
            } else {
                if (!game) {
                    console.log("Game with this id not available");
                    res.status(404).json({ "message": "Game with id \"" + gameId + "\" not available" })
                    return                
                } else {
                    console.log("game found");
                    _updatePublisher(req, res, game)
                }
    
            }
    
        }) 

    }
}

module.exports = {
    publisherGetOne : getOne,
    publisherAddOne : addOne,
    publisherDeleteOne: deleteOne,
    publisherUpdateOne : updateOne
}