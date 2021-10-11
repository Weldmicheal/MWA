
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
    
    if(req.query && req.query.lng && req.query.lat){
        runGeoSerach(req, res)
        return
    }

    let offset = req.query.offset
    let count = 5;
    console.log("bend" , req.query.offset);
    const maxCount = 10
    if (req.query && req.query.offset && req.query.offset >= 0) {
        offset = parseInt(req.query.offset)
    }else{
        offset = 0;
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

addOne = function (req, res) {

    var newGame = {
        title : req.body.title,
        price : req.body.price,
        minAge : req.body.minAge,
        designers : req.body.designers,
        year : req.body.year,
        rate : req.body.rate,
        minPlayers : req.body.minPlayers,
        maxPlayers : req.body.maxPlayer,
        reviews : req.body.reviews
    }
    Game.create(newGame, function (err, response) {
        if (err) {
            res.status(500).json({ error: err })
            return
        }
        res.status(201).json(response.ops)
    })

}

deleteOne = function(req, res){
    const gameId = req.params.gameId;
    if(!mongoose.isValidObjectId(gameId)){
        console.log("gameId is invalid");
        res.status(400).json({"error":"\""+gameId +"\" is invalid gameId"})
        return
    }else{
        Game.findByIdAndRemove(gameId).exec(function(err, deletedGame){
            if(err){
                console.log("Error deleting game");
                res.status(500).json(err)
            }else {
                if(!deletedGame){
                    console.log("Game id not found");
                    res.status(404).json({"error":"\""+gameId+"\" not found"})
                }else{
                console.log("Deleted Successfully");
                res.status(204).json()
                }
            }
        })
    }
}

updateOne = function(req, res){
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game){
        if(err){
            console.log("Error finding game");
            res.status(500).json(err)
            return
        }else{
            if(!game){
                console.log("Game Id not found");
                res.status(404).json({"message":"\""+gameId + "\" not found"})
            }else{
                game.title = req.body.title;
                game.year = parseInt(req.body.year);
                game.price = parseFloat(req.body.year);
                game.designers = req.body.designers;
                game.minPlayers = parseInt(req.body.minPlayers);
                game.maxPlayers = parseInt(req.body.maxPlayers);
                game.rate = parseFloat(req.body.rate);
                game.minAge = parseInt(req.body.minAge);
                
                game.save(function(err, updatedGame){
                    if(err){ 
                        console.log(err)
                        res.status(500).json(err)
                        return
                    }else{
                        res.status(204).json()
                    }
                })

            }
        }
    })
}

patchOne = function(req, res){
    const gameId = req.params.gameId

    if(!mongoose.isValidObjectId(gameId)){
        console.log("gameId not valid");
        res.status(400).json({"message":"\"" + gameId + "\" is invalid gameId"})
        
    }else{
        Game.findById(gameId).exec(function(err, game){
            if(err){
                console.log("Error finding game");
                res.status(500).json(err)
                return
            }else{
                if(!game){
                    console.log("game not found");
                    res.status(404).json({"message": "\" Game with id "+gameId+"\" not found"})
                    return
                }else{
                    let changes = req.body
                    let originalGame = game 

                    if(!isNaN(changes.title)){
                        originalGame.title = changes.title
                    }
                    if(!isNaN(changes.year)){
                        originalGame.year = parseInt(changes.year)
                    }
                    if(!isNaN(changes.price)){
                        originalGame.price = parseFloat(changes.price)
                    }
                    if(!isNaN(changes.designers)){
                        originalGame.designers = changes.designers
                    }
                    if(!isNaN(changes.minPlayers)){
                        originalGame.minPlayers = parseInt(changes.minPlayers)
                    }
                    if(!isNaN(changes.maxPlayers)){
                        originalGame.maxPlayers = parseInt(changes.maxPlayers)
                    }
                    if(!isNaN(changes.rate)){
                        originalGame.rate = parseFloat(changes.rate)
                    }
                    if(!isNaN(changes.minAge)){
                        originalGame.minAge = parseInt(changes.minAge)
                    }

                    originalGame.save(function(err, updatedGame){
                        if(err){
                            console.log(err);
                            res.status(500).json(err)
                            return
                        }else{
                            console.log("Successfully updated");
                            res.status(204).json()
                        }
                    })
                }
            }
        })
    }
}

module.exports = {
    gamesGetAll: getAll,
    gamesGetOne: getOne,
    gamesAddOne: addOne,
    gamesDeleteOne : deleteOne,
    gamesUpdateOne : updateOne,
    gamesPatchOne : patchOne
}