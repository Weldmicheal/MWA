angular.module("meanGames").controller("GamesController", GamesController)

function GamesController(GamesFactory){
    const vm= this
    vm.title= "MEAN Games App"
    GamesFactory.getAllGames().then(function(games){
            vm.games = games

        })
    vm.addGame = function(){
        const postData = {
            title : vm.gameTitle,
            price : vm.gamePrice
        }
        console.log(vm.gameForm.$dirty);
        console.log(vm.gameForm.$valid);
        if(vm.gameForm.$dirty && vm.gameForm.$valid){
            GamesFactory.addOneGame(postData)
                .then(function(response){
                    console.log("Game saved");
                })
        }
    }
}