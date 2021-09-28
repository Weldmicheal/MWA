const childP = require("child_process")

console.log("check 1")

const fib = childP.spawn("node", ["./app"], {stdio: "inherit"})

console.log("check 2")