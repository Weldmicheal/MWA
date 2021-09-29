const gamesData = require("../data/games.json")

getAll = function (req, res) {
    console.log("JSON GET request")
    let count = 5
    let offset = 0;

    console.log("req.query", req.query);
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset)
    }

    if(req.query && req.query.count){
        count = parseInt(req.query.count)
    }

    console.log("offset", offset);
    console.log("offoffset, offset + count" + offset + count);
    const pageGames = gamesData.slice(offset, offset + count)
    res.status(200).json(pageGames)

}

getOne = function(req, res){
    console.log("GET One Game Controller")
    const gameIndex = req.params.gameId;
    const oneGame=  gamesData[gameIndex]
    res.status(200).json(oneGame)
}

AddOne = function (req, res) {
    console.log("JSON POST request")
    res.status(200).json({ "jsonData": false })

}

module.exports = {
    gamesGetAll:getAll,
    gamesGetOne:getOne

}