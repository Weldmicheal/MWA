var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let Student = class Student {
    constructor(name, gpa) {
        this.name = name;
        this.gpa = gpa;
    }
};
Student = __decorate([
    Token({ id: 134, canTalk: true }),
    __metadata("design:paramtypes", [String, Number])
], Student);
let DE_Student = class DE_Student {
    constructor(name, gpa) {
        this.name = name;
        this.gpa = gpa;
    }
};
DE_Student = __decorate([
    Token({ id: 143, canTalk: false }),
    __metadata("design:paramtypes", [String, Number])
], DE_Student);
function Token(token) {
    return function (constructor) {
        constructor.prototype.something = "Hello";
        constructor.prototype.token = token.id;
        if (token.canTalk) {
            constructor.prototype.talk = function () {
                console.log("I can talk");
            };
        }
    };
}
const jack = new Student("Jack Smith", 4.0);
console.log("student info", jack.name, jack.gpa);
console.log("jack Token", jack["token"]);
console.log("something", jack["something"]);
jack["talk"]();
let john = new DE_Student("John Simpns", 3.0);
console.log("john Token", john["token"]);
