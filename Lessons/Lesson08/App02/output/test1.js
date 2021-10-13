let x;
x = "jack";
console.log("x is ", x);
x = 5;
console.log("x is ", x);
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
console.log("Gender.Male", Gender.Male);
console.log("Gender[0]", Gender[0]);
let gender = Gender.Male;
console.log("gender", gender);
console.log("gender is ", Gender[gender]);
var DAYS_OF_WEEK;
(function (DAYS_OF_WEEK) {
    DAYS_OF_WEEK[DAYS_OF_WEEK["MONDAY"] = 1] = "MONDAY";
    DAYS_OF_WEEK[DAYS_OF_WEEK["TUESDAY"] = 2] = "TUESDAY";
    DAYS_OF_WEEK[DAYS_OF_WEEK["WEDNESDAY"] = 3] = "WEDNESDAY";
    DAYS_OF_WEEK[DAYS_OF_WEEK["THURSDAY"] = 4] = "THURSDAY";
    DAYS_OF_WEEK[DAYS_OF_WEEK["FRIDAY"] = 5] = "FRIDAY";
    DAYS_OF_WEEK[DAYS_OF_WEEK["SATURDAY"] = 6] = "SATURDAY";
    DAYS_OF_WEEK[DAYS_OF_WEEK["SUNDAY"] = 4] = "SUNDAY";
})(DAYS_OF_WEEK || (DAYS_OF_WEEK = {}));
console.log("DAYS.WEEk", DAYS_OF_WEEK.THURSDAY);
console.log("Sunday.WEEk", DAYS_OF_WEEK.SUNDAY);
console.log("when we have same indexes the last one will be ", DAYS_OF_WEEK[4]);
