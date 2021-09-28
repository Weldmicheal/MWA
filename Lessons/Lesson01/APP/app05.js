const fs = require("fs")

console.log("1: Get the file")

fs.readFile("./hello", (err, data) => {
    console.log("2: Got the file")
    console.log(data)
})

console.log("3: App continues")