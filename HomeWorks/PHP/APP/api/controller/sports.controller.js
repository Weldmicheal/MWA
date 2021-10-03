const mongoose = require("mongoose")

const Olympics = mongoose.model("Olympics")


const _addReviews = function (req, res, olympics) {

    var existingReviewsLen;
    existingReviewsLen = olympics.sports.length
    var sports = JSON.parse(JSON.stringify(req.body))
    sports = sports.sports
    const reviewLength = sports.length
    for (let i = 0; i < reviewLength; i++) {
        olympics.sports[i + existingReviewsLen] = { name: sports[i].name, review: sports[i].review, date: sports[i].date }

    }
    console.log(olympics.sports[0].name);
    olympics.save(function (err, updatedOlympics) {
        if (err) {
            console.log("Error adding sports");
            res.status(500).json(err)
            return
        } else {
            res.status(201).json(updatedOlympics.sports)
        }
    })
}

const _deleteReview = function (req, res, olympics) {

    const reviewId = req.params.reviewId

    var existingReviewsLen = olympics.sports.length
    var index = -1;
    for (let i = 0; i < existingReviewsLen; i++) {
        if (olympics.sports[i].id === reviewId) {
            index = i
            break;
        }        
    }
    if (index != -1) {
        olympics.sports.splice(index, 1)
    }
    olympics.save(function (err, updatedOlympics) {
        if (err) {
            console.log("Error deleting review");
            res.status(500).json(err)
            return
        } else {
            res.status(201).json(updatedOlympics)
        }
    })
}


const _updateReview = function (req, res, olympics) {

    const reviewId = req.params.reviewId

    var existingReviewsLen = olympics.sports.length
    var index = -1;
    for (let i = 0; i < existingReviewsLen; i++) {
        if (olympics.sports[i].id === reviewId) {
            index = i
            break;
        }        
    }
    var insertIdx;
    if (index != -1) {
        insertIdx = index
    }else{
        insertIdx = olympics.sports.length
    }
    olympics.sports[insertIdx] = { name: req.body.name, review: req.body.review, date: req.body.date }

    olympics.save(function (err, updatedOlympics) {
        if (err) {
            console.log("Error updating sports");
            res.status(500).json(err)
            return
        } else {
            res.status(201).json(updatedOlympics)
        }
    })
}


getAll = function (req, res) {
    const olympicsId = req.params.olympicsId
    if (!mongoose.isValidObjectId(olympicsId)) {
        console.log("\"" + olympicsId + "\" is invalid olympicsId");
        res.status(400).json({ "message": "\"" + olympicsId + "\" is invalid olympicsId" })
        return
    } else {
        Olympics.findById(olympicsId).select("sports").exec(function (err, docs) {
            if (err) {
                console.log(err);
                res.status(500).json(err)
                return
            } else {
                if (!docs) {
                    console.log("olympics id not found");
                    res.status(400).json({ "message": " olympics with id \"" + olympicsId + "\" not found" })
                    return
                } else {
                    res.status(200).json(docs.sports)
                }
            }
        })
    }
}

getOne = function (req, res) {
    const olympicsId = req.params.olympicsId
    const reviewId = req.params.reviewId

    if (!mongoose.isValidObjectId(olympicsId) || !mongoose.isValidObjectId(reviewId)) {
        console.log("olympicsId and reviewId should be valid");
        res.status(400).json({ "message": " olympicsId and/or reviewId is invalid" })
        return
    } else {
        Olympics.findById(olympicsId).select("sports").exec(function (err, olympics) {
            if (err) {
                console.log(err);
                res.status(500).json(err)
                return
            } else {
                if (!olympics) {
                    console.log("Olympics Id not found");
                    res.status(404).json({ "message": "olympics \"" + olympicsId + "\" not found" })
                    return
                } else {
                    res.status(200).json(olympics.sports.id(reviewId))
                }
            }
        })
    }
}


addAll = function (req, res) {

    const olympicsId = req.params.olympicsId
    if (!mongoose.isValidObjectId(olympicsId)) {
        console.log("\"" + olympicsId + "\" is invalid olympicsId");
        res.status(400).json({ "message": "\"" + olympicsId + "\" is invalid olympicsId" })
        return
    }
    Olympics.findById(olympicsId).exec(function (err, olympics) {
        if (err) {
            console.log("Error finding the olympics");
            res.status(500).json(err)
            return
        } else {
            if (!olympics) {
                console.log("Olympics with this id not available");
                res.status(404).json({ "message": "Olympics with id \"" + olympicsId + "\" not available" })
                return
            } else {
                console.log("olympics found");
                _addReviews(req, res, olympics)
            }

        }

    })
}

deleteOne = function (req, res) {
    const olympicsId = req.params.olympicsId
    if (!mongoose.isValidObjectId(olympicsId)) {
        console.log("\"" + olympicsId + "\" is invalid olympicsId");
        res.status(400).json({ "message": "\"" + olympicsId + "\" is invalid olympicsId" })
        return
    } else {
        Olympics.findById(olympicsId).exec(function (err, olympics) {
            if (err) {
                console.log("Error finding the olympics");
                res.status(500).json(err)
                return
            } else {
                if (!olympics) {
                    console.log("Olympics with this id not available");
                    res.status(404).json({ "message": "Olympics with id \"" + olympicsId + "\" not available" })
                    return
                } else {
                    console.log("olympics found");
                    _deleteReview(req, res, olympics)
                }

            }

        })

    }
}

updateOne = function (req, res) {
    const olympicsId = req.params.olympicsId
    if (!mongoose.isValidObjectId(olympicsId)) {
        console.log("\"" + olympicsId + "\" is invalid olympicsId");
        res.status(400).json({ "message": "\"" + olympicsId + "\" is invalid olympicsId" })
        return
    } else {
        Olympics.findById(olympicsId).exec(function (err, olympics) {
            if (err) {
                console.log("Error finding the olympics");
                res.status(500).json(err)
                return
            } else {
                if (!olympics) {
                    console.log("Olympics with this id not available");
                    res.status(404).json({ "message": "Olympics with id \"" + olympicsId + "\" not available" })
                    return
                } else {
                    console.log("olympics found");
                    _updateReview(req, res, olympics)
                }

            }

        })

    }
}

module.exports = {
    sportsGetAll: getAll,
    sportsGetOne: getOne,
    sportsAddAll: addAll,
    sportsDeleteOne: deleteOne,
    sportsUpdateOne: updateOne
}