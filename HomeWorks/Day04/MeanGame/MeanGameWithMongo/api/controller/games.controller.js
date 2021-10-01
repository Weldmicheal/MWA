const dbConnection = require("../data/dbconnection")

getAll = function(req, res){
    const db = dbConnection.get()
    const gamesCollection = db.collection("games")

    let offset = 0;
    let count = 6;
    const maxGames = 9;
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset)
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count)
        if(count > maxGames){
            res.status(400).json({"err":"your requested above 9"})
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

module.exports = {
    gamesGetAll : getAll
}