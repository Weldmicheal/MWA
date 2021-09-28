console.log("1: Start")

const fib = require("./computation/_fibonacci")

setTimeout(function() {
    console.log("Message 1")
    console.log("Fib of 10 is", fib.fib(10))
}, 0)

setTimeout(function() {
    console.log("Message 2")
    console.log("Fib of 10 is", fib.fib(10))
}, 0)

console.log("2: End")

// This is asynchoronous but still blocking