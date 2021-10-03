const mongoose = require("mongoose")

const Game = mongoose.model("Game")


const _addReviews = function (req, res, game) {

    var existingReviewsLen;
    existingReviewsLen = game.reviews.length
    console.log(existingReviewsLen);

    var reviews = JSON.parse(JSON.stringify(req.body))
    reviews = reviews.reviews
    const reviewLength = reviews.length
    for (let i = 0; i < reviewLength; i++) {
        game.reviews[i + existingReviewsLen] = { name: reviews[i].name, review: reviews[i].review, date: reviews[i].date }

    }
    console.log(game.reviews[0].name);
    game.save(function (err, updatedGame) {
        if (err) {
            console.log("Error adding reviews");
            res.status(500).json(err)
            return
        } else {
            res.status(201).json(updatedGame.reviews)
        }
    })
}

const _deleteReview = function (req, res, game) {

    const reviewId = req.params.reviewId

    var existingReviewsLen = game.reviews.length
    var index = -1;
    for (let i = 0; i < existingReviewsLen; i++) {
        if (game.reviews[i].id === reviewId) {
            index = i
            break;
        }        
    }
    if (index != -1) {
        game.reviews.splice(index, 1)
    }
    game.save(function (err, updatedGame) {
        if (err) {
            console.log("Error deleting review");
            res.status(500).json(err)
            return
        } else {
            res.status(201).json(updatedGame)
        }
    })
}


const _updateReview = function (req, res, game) {

    const reviewId = req.params.reviewId

    var existingReviewsLen = game.reviews.length
    var index = -1;
    for (let i = 0; i < existingReviewsLen; i++) {
        if (game.reviews[i].id === reviewId) {
            index = i
            break;
        }        
    }
    var insertIdx;
    if (index != -1) {
        insertIdx = index
    }else{
        insertIdx = game.reviews.length
    }
    game.reviews[insertIdx] = { name: req.body.name, review: req.body.review, date: req.body.date }

    game.save(function (err, updatedGame) {
        if (err) {
            console.log("Error updating reviews");
            res.status(500).json(err)
            return
        } else {
            res.status(201).json(updatedGame)
        }
    })
}


getAll = function (req, res) {
    const gameId = req.params.gameId
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("\"" + gameId + "\" is invalid gameId");
        res.status(400).json({ "message": "\"" + gameId + "\" is invalid gameId" })
        return
    } else {
        Game.findById(gameId).select("reviews").exec(function (err, docs) {
            if (err) {
                console.log(err);
                res.status(500).json(err)
                return
            } else {
                if (!docs) {
                    console.log("game id not found");
                    res.status(400).json({ "message": " game with id \"" + gameId + "\" not found" })
                    return
                } else {
                    res.status(200).json(docs.reviews)
                }
            }
        })
    }
}

getOne = function (req, res) {
    const gameId = req.params.gameId
    const reviewId = req.params.reviewId

    if (!mongoose.isValidObjectId(gameId) || !mongoose.isValidObjectId(reviewId)) {
        console.log("gameId and reviewId should be valid");
        res.status(400).json({ "message": " gameId and/or reviewId is invalid" })
        return
    } else {
        Game.findById(gameId).select("reviews").exec(function (err, game) {
            if (err) {
                console.log(err);
                res.status(500).json(err)
                return
            } else {
                if (!game) {
                    console.log("Game Id not found");
                    res.status(404).json({ "message": "game \"" + gameId + "\" not found" })
                    return
                } else {
                    res.status(200).json(game.reviews.id(reviewId))
                }
            }
        })
    }
}


addAll = function (req, res) {

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
                _addReviews(req, res, game)
            }

        }

    })
}

deleteOne = function (req, res) {
    const gameId = req.params.gameId
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("\"" + gameId + "\" is invalid gameId");
        res.status(400).json({ "message": "\"" + gameId + "\" is invalid gameId" })
        return
    } else {
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
                    _deleteReview(req, res, game)
                }

            }

        })

    }
}

updateOne = function (req, res) {
    const gameId = req.params.gameId
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("\"" + gameId + "\" is invalid gameId");
        res.status(400).json({ "message": "\"" + gameId + "\" is invalid gameId" })
        return
    } else {
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
                    _updateReview(req, res, game)
                }

            }

        })

    }
}

module.exports = {
    reviewsGetAll: getAll,
    reviewsGetOne: getOne,
    reviewsAddAll: addAll,
    reviewsDeleteOne: deleteOne,
    reviewsUpdateOne: updateOne
}