const mongoose = require("mongoose")

const Game = mongoose.model("Game")

getAll = function(req, res){
    const gameId = req.params.gameId
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("\"" + gameId + "\" is invalid gameId");
        res.status(400).json({ "message": "\"" + gameId + "\" is invalid gameId" })
        return
    }else{
        Game.findById(gameId).select("reviews").exec(function(err, docs){
            if(err){
                console.log(err);
                res.status(500).json(err)
                return
            }else{
                if(!docs){
                    console.log("game id not found");
                    res.status(400).json({"message": " game with id \""+ gameId +"\" not found"})
                    return
                }else{
                    res.status(200).json(docs.reviews)
                }
            }
        })
    }
}

getOne = function(req, res){
    const gameId = req.params.gameId
    const reviewId = req.params.reviewId

    if (!mongoose.isValidObjectId(gameId) || !mongoose.isValidObjectId(reviewId)) {
        console.log("gameId and reviewId should be valid");
        res.status(400).json({ "message": " gameId and/or reviewId is invalid" })
        return
    }else{
        Game.findById(gameId).select("reviews").exec(function(error, game){
            if(err){
                console.log(err);
                res.status(500).json(err)
                return 
            }else{
                if(!doc){
                    console.log("Game Id not found");
                    res.status(404).json({"message": "game \""+gameId+"\" not found"})
                    return 
                }else{
                    res.status(200).json(game.reviews.id(reviewId))
                }
            }
        })
    }
}

module.exports = {
    reviewsGetAll : getAll,
    reviewsGetOne : getOne
}