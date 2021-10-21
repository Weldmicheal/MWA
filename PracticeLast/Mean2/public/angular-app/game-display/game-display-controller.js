angular.module("meanGames").controller("GameController", GameController);

function GameController(GameDataFactory, $routeParams) {
    var vm = this;
    var id = $routeParams.id;
    console.log("hhhhhhhhhhhh");
    function _getStarRating(rate) {
        return new Array(rate);
    }

    GameDataFactory.getOneGame(id).then(function(response) {
        
        console.log(response);
        vm.game= response;
        vm.rating= _getStarRating(vm.game.rate);
    });
}

// function _getStarRating(rate) {
//     return new Array(rate);
// }