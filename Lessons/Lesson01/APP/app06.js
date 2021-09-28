const fs = require('fs')

const onFileLoad = function(err, data){
    console.log("file found")
}

console.log("1: Going to get a file")

fs.readFile('./hello', onFileLoad)

console.log("app continues")

