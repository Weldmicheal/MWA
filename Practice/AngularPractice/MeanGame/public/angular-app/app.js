angular.module("meanGames", ["ngRoute"]).config(config)

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl : "angular-app/main/main.html"
    }).when("/games", {
        templateUrl : "angular-app/game-list/games.html",
        controller : "GamesController",
        controllerAs : "vm"
    }).when("/games/:gameId", {
        templateUrl : "angular-app/game-one/game.html",
        controller : "GameController",
        controllerAs : "vm"
    })
    .otherwise({
        redirectTo: "/"
    })
}