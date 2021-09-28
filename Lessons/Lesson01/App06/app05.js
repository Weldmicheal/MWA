const fs = require('fs')

const onFileLoad = function(err, file) {
    console.log("2: Got the file")
}

console.log("1: Get a file")
fs.readFileSync("./shortfile.txt", onFileLoad)

// setTimeout(onFileLoad, 2000)
console.log("2: Got the file")
console.log("3: App End")