const fs = require("fs")

console.log("1")

fs.readFile('./test.txt', function(err, data){
    console.log('File found')
})

console.log("2")

var startTime = Date.now()

while((Date.now()-startTime) < 1000){
    console.log("excuting")
}