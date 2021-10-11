angular.module("meanGames").controller("GameController", GameController)


function _createArr(stars){
    return new Array(stars)
}

function GameController(GameFactory, $routeParams){
    const vm = this
    const gameId = $routeParams.gameId
    vm.title = "Game Details"
    GameFactory.gamesGetOne(gameId)
        .then(function(game){
            vm.game = game
           vm.rating = _createArr(game.rate)
        })
}