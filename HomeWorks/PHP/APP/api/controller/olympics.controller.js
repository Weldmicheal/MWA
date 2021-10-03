const mongoose = require("mongoose")
const Olympics = mongoose.model("Olympics")

getAll = function (req, res) {

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
    Olympics.find().skip(offset).limit(count).exec(function (err, olympics) {
        if (err) {
            console.log("Error finding olympics");
            res.status(500).json(err)
        } else {
            console.log("olympics retrieved");
            res.status(200).json(olympics)
        }

    })

}

getOne = function (req, res) {

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
            if (olympics) {
                console.log("olympics found");
                res.status(200).json(olympics)
            } else {
                console.log("Olympics with this id not available");
                res.status(404).json({ "message": "Olympics with id \"" + olympicsId + "\" not available" })
            }

        }

    })

}

addOne = function (req, res) {

    var newOlympics = {
        year : req.body.year,
        city : req.body.city,
        country: req.body.country
    }
    Olympics.create(newOlympics, function (err, response) {
        if (err) {
            res.status(500).json({ error: err })
            return
        }
        res.status(201).json(response.ops)
    })

}

deleteOne = function(req, res){
    const olympicsId = req.params.olympicsId;
    if(!mongoose.isValidObjectId(olympicsId)){
        console.log("olympicsId is invalid");
        res.status(400).json({"error":"\""+olympicsId +"\" is invalid olympicsId"})
        return
    }else{
        Olympics.findByIdAndRemove(olympicsId).exec(function(err, deletedOlympics){
            if(err){
                console.log("Error deleting olympics");
                res.status(500).json(err)
            }else {
                if(!deletedOlympics){
                    console.log("Olympics id not found");
                    res.status(404).json({"error":"\""+olympicsId+"\" not found"})
                }else{
                console.log("Deleted Successfully");
                res.status(204).json()
                }
            }
        })
    }
}

updateOne = function(req, res){
    const olympicsId = req.params.olympicsId;
    if(!mongoose.isValidObjectId(olympicsId)){
        console.log("olympicsId is invalid");
        res.status(400).json({"error":"\""+olympicsId +"\" is invalid olympicsId"})
        return
    }
    Olympics.findById(olympicsId).exec(function(err, olympics){
        if(err){
            console.log("Error finding olympics");
            res.status(500).json(err)
            return
        }else{
            if(!olympics){
                console.log("Olympics Id not found");
                res.status(404).json({"message":"\""+olympicsId + "\" not found"})
            }else{
                olympics.year = ParseInt(req.body.year);
                olympics.city = req.body.city   
                olympics.country = req.body.country           
        
                olympics.save(function(err, updatedOlympics){
                    if(err){ 
                        console.log(err)
                        res.status(500).json(err)
                        return
                    }else{
                        res.status(201).json(updatedOlympics)
                    }
                })

            }
        }
    })
}
module.exports = {
    olympicsGetAll: getAll,
    olympicsGetOne: getOne,
    olympicsAddOne: addOne,
    olympicsDeleteOne : deleteOne,
    olympicsUpdateOne : updateOne
}