const MongoClient = require("mongodb").MongoClient

const dbName = "meanGamesDb"

const dbUrl = "mongodb://localhost:27017/"+dbName

var _connection = null

var open = function(){
    MongoClient.connect(dbUrl, {useUnifiedTopology: true}, function(err, client){
        if(err){
            console.log("DB connection failed");
            return
        }
        _connection = client.db(dbName)
       // console.log("db", _connection);
    })
}

var get = function(){
    return _connection
}

module.exports = {
    opened: open,
    get : get
}