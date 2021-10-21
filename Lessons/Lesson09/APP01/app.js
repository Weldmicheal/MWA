const mySaveToDB = function(a, b, f){
    console.log("Saving to db", a);
    console.log("Saving document", b);
    console.log("Saving in process...");
    setTimeout(f, 2000)
    
}


const myCallback = function(){
    console.log("HI I am callback");
}

mySaveToDB("meanGames", 4, myCallback)