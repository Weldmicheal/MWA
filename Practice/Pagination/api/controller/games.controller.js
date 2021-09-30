const dbConnection = require("../data/dbconnection")
const ObjectId = require("mongodb").ObjectId

getAll = function(req, res){
    const db = dbConnection.get()
    console.log("db", db);
    let offset = 0
    let count = 5
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset)
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count)
    }
    const collection = db.collection("games")

    collection.find().skip(offset).limit(count).toArray(function(err, docs){
        console.log("games found", docs);   
        
        res.status(200).json(docs)
    })

}

getOne = function(req, res){
    const db = dbConnection.get()
    const collection = db.collection("games")
    const gameId = req.params.gameId

    collection.findOne({_id:ObjectId(gameId)}), function(err, doc){
        console.log("Found game: ", doc);
        res.status(200).json(doc)
    }
}

addOne = function(req, res){
    const db = dbConnection.get()
    const collection = db.collection("games")
    var newGame = {}
    if(req.body && req.body.title && req.body.price){
        console.log(req.body);
        newGame.title = req.body.title
        newGame.price = parseFloat(req.body.price)
        collection.insertOne(newGame, function(err, response){
            console.log(response.ops);
            res.status(201).json(response.ops)
        })

    }

    
}

module.exports = {
    gamesGetAll : getAll,
    gamesGetOne : getOne,
    gamesAddOne : addOne
}