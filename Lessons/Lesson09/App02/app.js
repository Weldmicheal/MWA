const promise1 = new Promise((resolve, reject) => {
    let num = Math.random()
    setTimeout(() => {
        if(num > 0.5){
            resolve(num)
        }else {
            reject("Promise1 Failed")
        }
    }, 3000)
})


const promise2 = new Promise((resolve, reject) => {
    let num = Math.random()+0.5
    setTimeout(() => {
        if(num > 0.5){
            resolve(num)
        }else {
            reject("Promise2 Failed")
        }
    }, 1000)
})

const promise3 = new Promise((resolve, reject) => {
    let num = Math.random()-0.5
    setTimeout(() => {
        if(num > 0.5){
            resolve(num)
        }else {
            reject("Promise3 Failed")
        }
    }, 1000)
})
/////////////////////////////////////////////





console.log("1-start");

console.log("Promise1", promise1);
promise1.then((value) => {
    console.log("Promise1 Done with value", value);
    console.log("Promise1", promise1);

}).then((value) => {
    console.log("Second then");
    console.log(" with value", value);

}).then(() => {
    console.log("Third then");
    console.log(" with value", value);

}).
catch((error) =>{
    console.log("Promise1 Failed with error", error);
    console.log("Promise1", promise1);

})
console.log("Promise1", promise1);

console.log("2-start");
console.log("Promise2", promise2);

promise2.then((value) => {
    console.log("Promise2 Done with value", value);
}).catch((error) =>{
    console.log("Promise1 Failed with error", error);
})
console.log("Promise1", promise2);

console.log("1-start");
promise3.then((value) => {
    console.log("Promise1 Done with value", value);
}).catch((error) =>{
    console.log("Promise1 Failed with error", error);
})

Promise.all([promise1, promise2, promise3]).then((value) => {
    console.log("All passed", value);
}).catch((error) => {
    console.log("All error", error);
})

// check the outpout when all are true


// In race, the one who executed first will be resolved
// Promise.race([promise1, promise2, promise3]).then((value) => {
//     console.log("Race passed", value);
// }).catch((error) => {
//     console.log("Race error") // console.log("Race error", error) will not be printed
//     console.log(error);
// })

// write 

