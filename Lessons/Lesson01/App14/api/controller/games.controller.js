module.exports.gamesGetAll = function (req, res) {
    console.log("JSON GET request")
    res.status(200).json({ "jsonData": true })

}

gamesAddOne = function (req, res) {
    console.log("JSON POST request")
    res.status(200).json({ "jsonData": false })

}