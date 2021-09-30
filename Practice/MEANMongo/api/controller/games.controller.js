const games = require("../data/games.json")

getAll = function(req, res){
    console.log("Games Get requested")
    let count = 4
    let offset = 0
    if(req.query && req.query.count){
        count = parseInt(req.query.count)
    }
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset)
    }

    res.status(200).json(games.slice(offset, offset + count))
}

getOne = function(req, res){
    console.log("GET for one Game requested");
    let gameId = req.params.gameId
    res.status(200).json(games[gameId])
}

addOne = function(req, res){
    console.log("GAMES POST requested")
    console.log("body", req.body);
    res.status(200).json(req.body)
}

module.exports = {
    gamesGetAll : getAll,
    gamesGetOne : getOne,
    gamesAddOne : addOne
}