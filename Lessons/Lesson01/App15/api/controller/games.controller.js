const gamesData = require("../data/games.json")

module.exports.gamesGetAll = function (req, res) {
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


gamesAddOne = function (req, res) {
    console.log("JSON POST request")
    res.status(200).json({ "jsonData": false })

}