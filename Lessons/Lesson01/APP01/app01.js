require("./instantHello.js")

const talk = require("./talk")
talk.greeting("Jack")
talk.intro()

const question = require("./talk/question")
const answer = question.ask("what is the meaning of life?")
console.log(answer);

const goodbye = require("./goodbye")
goodbye()