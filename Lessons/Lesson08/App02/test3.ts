
@Token({id:134, canTalk:true})
class Student {
    constructor(public name:string, public gpa:number){}
}


@Token({id: 143, canTalk:false})
class DE_Student {
    constructor(public name:string, public gpa:number){}
}
function Token(token:any){
    return function(constructor:Function){
        constructor.prototype.something = "Hello"
        constructor.prototype.token = token.id;
        if(token.canTalk){
            constructor.prototype.talk = function(){
                console.log("I can talk");
                
            }
        }
    }
}

const jack = new Student("Jack Smith", 4.0)

console.log("student info", jack.name, jack.gpa);

console.log("jack Token", jack["token"]);
console.log("something", jack["something"]);


jack["talk talk"]()


let john = new DE_Student("John Simpns", 3.0)

console.log("john Token", john["token"]);




