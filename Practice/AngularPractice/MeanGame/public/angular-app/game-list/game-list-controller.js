angular.module("meanGames").controller("GamesController", GamesController)

function GamesController(GameFactory){
    const vm = this
    vm.title = "MEAN Games List"
    GameFactory.gamesGetAll().then(function(response){
        vm.games = response
    })
}