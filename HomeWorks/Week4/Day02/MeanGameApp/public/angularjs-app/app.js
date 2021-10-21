angular.module("meanGames", ["ngRoute"]).config(config)

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "angularjs-app/welcome/welcome.html",
        controller: "WelcomeController",
        controllerAs: "vm"
    }).when("/games", {
        templateUrl : "angularjs-app/game-list/games.html",
        controller: "GamesController",
        controllerAs: "vm"
    }).when("/games/:gameId", {
        templateUrl : "angularjs-app/game-one/game.html",
        controller: "GameController",
        controllerAs: "vm"
    }).when("/register", {
        templateUrl : "angularjs-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "vm"
    }).otherwise({
        redirectTo: "/"
    })
}