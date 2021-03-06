angular.module("meanGames").controller("GamesController", GamesController)

function GamesController(GameDataFactory) {
    const vm = this
    vm.title = "Mean Games App"

    GameDataFactory.getAllGames().then(function(response){
        vm.games = response
    })
}