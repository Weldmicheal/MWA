const fs = require("fs")
console.log("1: first")

const file = fs.readFileSync('./test.txt', 'utf-8')
console.log(file)

console.log("3: last")

