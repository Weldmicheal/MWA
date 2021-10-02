const mongoose = require("mongoose")

const Game = mongoose.model("Game")

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
                res.status(200).json(response.publisher)
            }
        })
    }
}

module.exports = {
    publisherGetOne : getOne
}