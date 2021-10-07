angular.module("olympicRaces", ["ngRoute"]).config(config)

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "angularjs-app/main/welcome.html",
        
    }).when("/races", {
        templateUrl : "angularjs-app/race-list/races.html",
        controller: "RacesController",
        controllerAs: "vm"
    }).when("/races/:raceId", {
        templateUrl : "angularjs-app/race-one/race.html",
        controller : "RaceController",
        controllerAs : "vm"
    }).otherwise({
        redirectTo: "/"
    })
}