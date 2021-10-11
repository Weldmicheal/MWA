const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = mongoose.model("User")

const sendCreateUserResult = function(err, user){
    if(err){
        console.log("create user error", err);
        res.status(500).json(err)
    }else{
        console.log("user created");
        res.status(201).json(user)
    }
}

const createUserUsinghash = function(err, hashPassword){
    if(err){
        console.log("err hashing password");
        res.status(500).json(error)
    }else {
    const newUser = {
        username : req.body.username,
        //password : req.body.password,
   
        // problem with the ff hashing the password is blocking
        password : hashPassword,
        
        name : req.body.name
       }
       User.create(newUser, (err, response) => sendCreateUserResult(err, result, err, hashPassword))
    }
}

const createUserUsingSalt = function(req, err, salt){
    if(err){
        console.log("salt generation err");
        res.status(500).json(err)
    }else{
        bcrypt.hash(req.body.password, salt, (err, response) => createUserUsinghash(err, result, req, err, salt))
    }
}

module.exports.addUser = function(req, res){
bcrypt.genSalt(10, (err, result) => createUserUsingSalt(err, result, req, res))

   
    
   
}