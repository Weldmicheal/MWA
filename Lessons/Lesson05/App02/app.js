angular.module("myPropperApp", ["ngRoute"]).config(config)

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl : "main/main.html",
        controller: "MainController",
        controllerAs: "mainCtrl"

    }).when('/about', {
        templateUrl:"./about/about.html",
        controller: "AboutController",
        controllerAs: "aboutCtrl"
    }).otherwise({
        redirectTo:"/"
    })
}
