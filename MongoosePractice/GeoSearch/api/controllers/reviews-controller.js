const mongoose = require("mongoose")

const Game = mongoose.model("Game")


getAll = function(req, res){
    const gameId = req.params.gameId
    Game.findById(gameId).select("reviews").exec(function(err, doc){
        res.status(200).json(doc.reviews)
    })
}

getOne = function(req, res){
    const gameId = req.params.gameId
    const reviewId = req.params.reviewId
    Game.findById(gameId).select("reviews").exec(function(err, game){
       const review = game.reviews.id(reviewId)
        res.status(200).json(review)
    })
}

module.exports = {
    reviewsGetAll : getAll,
    reviewsGetOne : getOne
}
