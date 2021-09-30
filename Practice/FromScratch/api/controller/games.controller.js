const games = require("../data/games.json")
const dbconnection = require("../data/dbconnection")
const { Collection } = require("mongodb")


 getAll = function(req, res){

    const db = dbconnection.get()

    const collection = db.collection("games")
    //const docs = collection.find()
    collection.find().toArray(function(err, docs){
        console.log("Found games", docs)
        res.status(200).json(docs)
    })

    //console.log("db", db)

//     console.log("Games GET requested")
//     let offset = 0
//     let count = 5
//     if(req.query && req.query.count){
//         count = parseInt(req.query.count)
//     }
//     if(req.query && req.query.offset){
//         offset = parseInt(req.query.offset)
//     }
//     res.status(200).json(games.slice(offset, offset + count))
}

getOne = function(req, res){
    console.log("GET for one Game requested")
    let gameIdx = req.params.gameId
    let game = games[gameIdx]
    res.status(200).json(game)
}

addOne = function(req, res){
    console.log("POST for one Game requested")
    console.log(req.body)
    res.status(200).json(req.body)
}


module.exports = {
    gamesGetAll : getAll,
    gamesGetOne : getOne,
    gamesAddOne : addOne
}