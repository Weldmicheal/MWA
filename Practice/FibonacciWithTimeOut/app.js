
console.log("1")

setTimeout(function(){
    require("./computation/fibonacci")
}, 1000)

console.log("2")

var startTime = Date.now()

while((Date.now() - startTime) < 500){
    console.log("Waiting")
}