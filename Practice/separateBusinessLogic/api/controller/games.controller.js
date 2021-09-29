gamesGetAll = function (req, res) {
    console.log("JSON GET requested")
    res.status(200).json({ "jsonData": true })
}
gamesAddOne = function(req, res){
    console.log("JSON POST requested")
    res.status(200).json({"jsonData": false})
}

module.exports = {
    gamesGetAll, gamesAddOne
}