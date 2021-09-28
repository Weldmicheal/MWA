const filename = "index.js"

const hello = function(name){
    console.log("hello"+ name)
}

const intro = function(){
    console.log("I'am a node file called " + filename)
}

module.exports = {
    greeting:hello,
    intro: intro
}