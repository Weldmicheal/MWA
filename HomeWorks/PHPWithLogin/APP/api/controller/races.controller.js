const mongoose = require("mongoose")
const Racing = mongoose.model("Racing")

function _getRacesByName(req, res){


    const name = req.query.name

    console.log("name       : ", name);

    const query = {name:name}
    Racing.find(query).exec(function (err, results) {
        if (err) {
            res.json(err);
        }
        if (results) {
            res.status(200).json(results);
        }
    });
}

getAll = function (req, res) {

    if(req.query && req.query.name){
        _getRacesByName(req, res)
        return
    }

    let offset = 0;
    let count = 5;
    const maxCount = 10
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset)
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
    Racing.find().skip(offset).limit(count).exec(function (err, racing) {
        if (err) {
            console.log("Error finding racing");
            res.status(500).json(err)
        } else {
            console.log("racing retrieved");
            res.status(200).json(racing)
        }

    })

}

getOne = function (req, res) {

    const racingId = req.params.racingId
    if (!mongoose.isValidObjectId(racingId)) {
        console.log("\"" + racingId + "\" is invalid racingId");
        res.status(400).json({ "message": "\"" + racingId + "\" is invalid racingId" })
        return
    }
    Racing.findById(racingId).exec(function (err, racing) {
        if (err) {
            console.log("Error finding the racing");
            res.status(500).json(err)
            return
        } else {
            if (racing) {
                console.log("racing found");
                res.status(200).json(racing)
            } else {
                console.log("Racing with this id not available");
                res.status(404).json({ "message": "Racing with id \"" + racingId + "\" not available" })
            }

        }

    })

}

addOne = function (req, res) {

    var newRacing = {
        name : req.body.name,
        numPlayers : req.body.numPlayers,
        country: req.body.country
    }
    Racing.create(newRacing, function (err, response) {
        if (err) {
            res.status(500).json({ error: err })
            return
        }
        res.status(201).json(response.ops)
    })

}

deleteOne = function(req, res){
    const racingId = req.params.racingId;
    if(!mongoose.isValidObjectId(racingId)){
        console.log("racingId is invalid");
        res.status(400).json({"error":"\""+racingId +"\" is invalid racingId"})
        return
    }else{
        Racing.findByIdAndRemove(racingId).exec(function(err, deletedRacing){
            if(err){
                console.log("Error deleting racing");
                res.status(500).json(err)
            }else {
                if(!deletedRacing){
                    console.log("Racing id not found");
                    res.status(404).json({"error":"\""+racingId+"\" not found"})
                }else{
                console.log("Deleted Successfully");
                res.status(204).json()
                }
            }
        })
    }
}

updateOne = function(req, res){
    const racingId = req.params.racingId;
    if(!mongoose.isValidObjectId(racingId)){
        console.log("racingId is invalid");
        res.status(400).json({"error":"\""+racingId +"\" is invalid racingId"})
        return
    }
    Racing.findById(racingId).exec(function(err, racing){
        if(err){
            console.log("Error finding racing");
            res.status(500).json(err)
            return
        }else{
            if(!racing){
                console.log("Racing Id not found");
                res.status(404).json({"message":"\""+racingId + "\" not found"})
            }else{
                racing.name = req.body.name;
                racing.numPlayers = parseFloat(req.body.numPlayers);     
                racing.country = req.body.country           
                racing.save(function(err, updatedRacing){
                    if(err){ 
                        console.log(err)
                        res.status(500).json(err)
                        return
                    }else{
                        res.status(201).json(updatedRacing)
                    }
                })

            }
        }
    })
}
module.exports = {
    racesGetAll: getAll,
    racesGetOne: getOne,
    racesAddOne: addOne,
    racesDeleteOne : deleteOne,
    racesUpdateOne : updateOne
}