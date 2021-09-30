const gamesData = require("../data/games.json")
const dbConnection = require("../data/dbconnection")
const ObjectId = require("mongodb").ObjectId


getAll = function (req, res) {
    console.log("GET Games controller")
    
    const db = dbConnection.get()
    const gamesCollection = db.collection("games");


    let count = 5
    let offset = 0;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset)
    }

    if(req.query && req.query.count){
        count = parseInt(req.query.count)
    }

   
    gamesCollection.find().skip(offset).limit(count).toArray(function(err, games){
        res.status(200).json(games)
    })

}

getOne = function(req, res){
    console.log("GET One Game Controller")
    const gameId = req.params.gameId
    const db = dbConnection.get()
    const gamesCollection = db.collection("games")

    gamesCollection.findOne({"_id":ObjectId(gameId)}, function(err, game){
       res.status(200).json(game)
    })
}

AddOne = function (req, res) {
    console.log("JSON AddONe request")
    console.log("body", req.body);
    const db = dbConnection.get()
    
    const gamesCollection=db.collection("games")
   
    if(req.body && req.body.title && req.body.price){
        console.log(req.body);
        let newGame = {}
        newGame.title = req.body.title
        newGame.price = req.body.price
        gamesCollection.insertOne(newGame, function(err, response){
            if(err){
                res.status(500).json({error:err})
            }else{
                res.status(201).json(response.ops)
            }
        })
       
    }else{
        console.log("Data missing from Post body");
        res.status(400).json({err:"required data missing from POST"})
    }    

}

module.exports = {
    gamesGetAll:getAll,
    gamesGetOne:getOne,
    gamesAddOne:AddOne

}