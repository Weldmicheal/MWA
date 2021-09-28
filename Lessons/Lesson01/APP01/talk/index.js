const filename = "index.js"

const hello = function(name){
    console.log("hello"+ name)
}

const intro = function(){
    console.log("I'am a node file called index.js")
}

module.exports = {
    greeting:hello,
    intro: intro
}