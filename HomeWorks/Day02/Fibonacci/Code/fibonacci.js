const fib = function(number){
    number = number < 0 ? -number: number;
    if(number <= 2) return 1
    return fib(number - 1) + fib(number -2)

}

module.exports = fib