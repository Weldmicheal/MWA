angular.module("meanGames").controller("GamesController", GamesController)

function GamesController(GamesFactory){
    const vm= this
    vm.title= "MEAN Games App"
    vm.games= GamesFactory.getAllGames("/api/games")
        .then(function(games){
            vm.games = games
        })
}