var fileName = "index.js"

const method1 = function(name){
    console.log("Hello", name)
}

const intro = function(){
    console.log("I am " + fileName + " Do hv Q?")
}



const method2 = function(question){
    console.log(question)
    return "Good question"
}

module.exports = {
    greeting: method1,
    intro: intro,
    ask: method2
}