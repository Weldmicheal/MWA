const dbConnection = require("../data/dbconnection")
const ObjectId = require("mongodb").ObjectId


getAll = function(req, res){
    const db = dbConnection.get()
    const gamesCollection = db.collection("games")

    let offset = 0;
    let count = 6;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset)
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count)
        if(count > 9){
            res.json({"err":"your requested above 9"})
            return
        }
    }

    gamesCollection.find().skip(offset).limit(count).toArray(function(err, games){
        if(err){
            res.status(500).json({error:err})
        }else{
            res.status(200).json(games)
        }
    })

}

getOne = function(req, res){
    const db = dbConnection.get()
    const gamesCollection = db.collection("games")

    const gameId = req.params.gameId

    gamesCollection.findOne({"_id": ObjectId(gameId)}, function(err, game){
        if(err){
            res.status(500).json({error: err})
            return
        }
        res.status(200).json(game)
    })

}

addOne = function(req, res){
    const db = dbConnection.get()
    const gamesCollection = db.collection("games")
    var newGame = {}
    if(req.body && req.body.title && req.body.price){
        newGame.title = req.body.title
        newGame.price = req.body.price

        gamesCollection.insertOne(newGame, function(err, response){
            if(err){
                res.status(400).json({error: err})
                return
            }
            res.status(201).json(response.ops)
        })
    }else{
        //console.log("body part missing");
        res.status(500).json({"err": "Games body missing"})
    }
}

module.exports = {
    gamesGetAll : getAll,
    gamesGetOne : getOne,
    gamesAddOne : addOne
}