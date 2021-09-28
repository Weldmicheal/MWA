const child_process = require("child_process")
console.log("1: Start")

const mewProcess = child_process.spawn("node",
["computation/_fibonacci"], {stdio: "inherit"})

setTimeout(function() {
    console.log("Message 1")
    //console.log("Fib of 10 is", fib(10))
}, 0)