const childProcess = require("child_process")

console.log("1")

const newProcess = childProcess.spawn("node", ["./computation/fibonacci"], {stdio:"inherit"})

console.log("2")

var startTime = Date.now()

while((Date.now() - startTime) < 500){
    console.log("Waiting")
}