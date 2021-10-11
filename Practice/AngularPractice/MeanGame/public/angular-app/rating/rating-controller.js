angular.module("meanGames").directive("gameRating", GameRating)

function GameRating() {
    return {
        restrict : "E",
        templateUrl: "angular-app/rating/rating.html",
        bindToController : true,
        controller: "GameController",
        controllerAs: "vm"
    }
}