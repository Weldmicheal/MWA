let x: any;
x="jack"
console.log("x is " , x);

x = 5

console.log("x is ", x);

enum Gender{
    Male,
    Female,
}

console.log("Gender.Male", Gender.Male);
console.log("Gender[0]", Gender[0]);

let gender = Gender.Male

console.log("gender", gender);

console.log("gender is ", Gender[gender]);

enum DAYS_OF_WEEK{
    MONDAY = 1,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY = 4
}

console.log("DAYS.WEEk", DAYS_OF_WEEK.THURSDAY);

console.log("Sunday.WEEk", DAYS_OF_WEEK.SUNDAY);

console.log("when we have same indexes the last one will be ", DAYS_OF_WEEK[4]);





