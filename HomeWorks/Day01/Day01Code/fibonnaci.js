const fibonnaci = function(number){
   number = number < 0 ? -number:number
   if(number <= 2){
       return 1;
   }
   return fibonnaci(number - 1) + fibonnaci(number - 2)
}
module.exports = fibonnaci;
