const mongoose = require("mongoose")

const Game = mongoose.model("Game")

addOne = function(req, res){
    const gameId = req.query.gameId;

    Game.findById(gameId).select("publisher").exec(function(err, game){
        if(err){
            res.status(500).json(err)

        }else if(!game){
            res.status(400).json({"message":"game not found"})
        }else{
            const newPublisher = {
                name : req.body.name,
                location: {
                    type:"Point",
                    coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
                }
            }
        }
    })
}