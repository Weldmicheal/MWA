angular.module("olympicRaces", ["ngRoute"]).config(config)

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "angularjs-app/main/welcome.html",
        
    }).when("/races", {
        templateUrl : "angularjs-app/race-list/races.html",
        controller: "RacesController",
        controllerAs: "vm"
    }).when("/race/:raceId", {
        templateUrl : "angularjs-app/race-one/race.html",
        controller: "RaceController",
        controllerAs: "vm"
    }).when("/races/:raceId/countries", {
        templateUrl : "angularjs-app/country-list/countries.html",
        controller: "CountriesController",
        controllerAs: "vm"
    }).when("/races/:raceId/countries/:countryId", {
        templateUrl : "angularjs-app/country/country.html",
        controller: "CountryController",
        controllerAs: "vm"
    }).when("/register", {
        templateUrl : "angularjs-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "vm"
    }).otherwise({
        redirectTo: "/"
    })
}