const fs = require("fs")

const callBack = function(err, data){
    console.log("file found")
}

console.log("1")

fs.readFile("./test.txt", callBack)

console.log("2")