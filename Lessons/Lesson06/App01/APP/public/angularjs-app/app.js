angular.module("meanGames", ["ngRoute"]).config(config)

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "angularjs-app/main/welcome",
        
    }).when("/games", {
        templateUrl : "angularjs-app/game-list/games.html",
        controller: "GamesController",
        controllerAs: "vm"
    })
}