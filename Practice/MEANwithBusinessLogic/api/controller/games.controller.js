const games = require("../data/games.json")

getAll = function(req, res){

    console.log("Games GET requested")
    let count = 5
    let offset = 0
    if(req.query && req.query.count){
        count = parseInt(req.query.count)
    }
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset)
    }

    //console.log("offset " + offset)
    //console.log("offset + count ", offset + count);
    

    res.status(200).json(games.slice(offset, offset + count))
}

getOne = function(req, res){
    console.log("GET for one Game requested")
    let gameId = req.params.gameId
    res.status(200).json(games[gameId])
}

AddOne = function(req, res){
    console.log("Games POST requested")
    res.status(200).json({"jsonData": false})
}



module.exports = {
    gamesGetAll: getAll,
    gamesGetOne: getOne,
    gamesAddOne: AddOne
}