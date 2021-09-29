const fib = function(num){
    num = num < 0 ? -num:num
    if(num <= 2) return 1
    return fib(num-1) + fib(num-2)
}
module.exports = {
    fib:fib
}