angular.module("meanGames").controller("GameController", GameController)

function GameController(GamesFactory, $routeParams){

    const vm = this
    const id = $routeParams.gameId
    GamesFactory.getOneGame(id).then(function(response){
        vm.game = response
    })

}