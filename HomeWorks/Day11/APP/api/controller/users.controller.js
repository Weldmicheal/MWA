const mongoose = require("mongoose")
const User = mongoose.model("User")


addOne = function (req, res) {

    console.log("registeration ");

    var newUser = {
        username : req.body.username,
        password : req.body.password,
    }
    User.create(newUser, function (err, response) {
        if (err) {
            res.status(500).json({ error: err })
            return
        }
        res.status(201).json(response.ops)
    })

}

module.exports = {
    addOneUser: addOne
}