const fs = require("fs")
console.log("1: Get a file");

const file = fs.readFileSync("./hello.txt")
console.log("2: Got the file")
console.log("3: App continues")