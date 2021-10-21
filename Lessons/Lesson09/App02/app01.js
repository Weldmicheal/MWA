function resolvePromise1After1s(){
    return new Promise(resolve => setTimeout(() => resolve("Done in 1 second"), 1000))
}

function resolvePromise1After2s(){
    return new Promise(resolve => setTimeout(() => resolve("Done in 2 second"), 1000))
}


async function myFunciton(){
    console.log("start");
let result2 = await resolvePromise1After2s()
console.log("Started the second promise");
console.log(result2);
let result1 = await resolvePromise1After1s()
console.log("Started the first promise");

console.log(result1);
}

myFunciton()