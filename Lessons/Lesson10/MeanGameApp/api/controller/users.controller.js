const mongoose = require("mongoose")
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken')

const express = require("express");


const User = mongoose.model("User")


addOne = function (req, res) {

    console.log("registeration ");

    var newUser = {
        username : req.body.username,
        //password : req.body.password
        password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }
    console.log("password, ", newUser.password);

    User.create(newUser, function (err, response) {
        if (err) {
            res.status(500).json({ error: err })
            return
        }
        res.status(201).json(response.ops)
    })

}

login = function(req, res){
    const usernmae = req.body.username
    const password = req.body.password

    User.find({
        usernmae: usernmae
    }).exec(function(err, user){
        if(err){
            res.status(400).json(err)
        }
        if(user){
            console.log("user", user);
            console.log("password", user.password);
            console.log("username", user.username);
            if(bcrypt.compareSync(password, user.password)){
                console.log("user Found");
                const token = jwt.sign({name: user.name}, "cs572", {expiresIn:3600})
                res.status(200).json({success:true, token:token})
            }else{
                console.log("Password incorrect");
                res.status(401).json("Unauthorized")
            }
            res.status(200).json("Nothing")
        }else{
            res.status(401).json("Unauthorized")
        }
    })
}

authenticate = function(req, res, next){
    const headerExists = req.headers.authorization
    if(headerExists){
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, "cs572", function(err, decoded){
            if(err){
                console.log(err);
                res.status(401).json("Unauthorized")
            }else {
                next()
            }
        })
    }else {
        res.status(403).json("No token provided")
    }
}

module.exports = {
    addOneUser: addOne,
    userLogin: login,
    authenticate: authenticate
}