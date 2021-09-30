const games = require("../data/games.json")

getAll = function(req, res){

    console.log("Games GET requested")
    res.status(200).json(games)

}
module.exports = {
    gamesGetAll: getAll
}