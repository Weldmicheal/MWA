console.log("1: start")

const laterWork = setTimeout(function(){
    console.log("2: This runs first")
}, 100)
const lastWork = setTimeout(function(){
    console.log("2: This runs second")
}, 10)

console.log("3: End")

var startTime = Date.now()

while((Date.now() - startTime) < 4000){
    console.log("Waiting")
}

