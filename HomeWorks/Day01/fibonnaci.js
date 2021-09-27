module.exports = function(number){
    number = number < 0 ? -number:number;
    var fibSeq = []
    var fn1 = 1;
    var fn2 = 1;
    var fn = 0;
    fibSeq.push(fn1)
    fibSeq.push(fn2)
    while(fn < number){
        fn = fn2 + fn1;
        if(fn> number){
            break
        }
        fibSeq.push(fn)
        fn1 = fn2;
        fn2 = fn
    }
    console.log("Fibonacci of " + number + " is: ")
    for(let i = 0; i < fibSeq.length; i++){
        console.log(fibSeq[i])
    }
}
