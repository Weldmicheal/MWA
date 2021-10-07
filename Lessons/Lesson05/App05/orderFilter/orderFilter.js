angular.module("myPropperApp").filter("order", orderFilter)

function orderFilter() {
    return function (number) {        //

        if (!isNaN(number) && (number == parseInt(number))){
        //if (!isNaN(number) && (((number * 10)% 10r))){
            let postfix = "th"
            const digit = number % 10
            switch (digit) {
                case 1:
                    postfix = "st"
                    break;
                case 2:
                    postfix = "nd"
                    break;
                case 3:
                    postfix = "rd"
                    break;
                default:
                    break;
            }
            return number + postfix

        } else {
            return number
        }


    }
}