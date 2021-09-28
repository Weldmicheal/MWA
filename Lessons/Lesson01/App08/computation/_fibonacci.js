fib = function(number){
    if(number <= 2){
        return 1
    }else{
        return fib(number -1) + fib(number-2);
    }
}

module.exports = {fib}
//console.log("Fibonacci of 45 if ", fib(45))