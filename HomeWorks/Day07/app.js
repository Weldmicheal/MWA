angular.module("myUserApp", ["ngRoute"]).config(config)

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl : "main/main.html",
        controller: "MainController",
        controllerAs: "mainCtrl"

    }).when('/about', {
        templateUrl:"./about/about.html",
        controller: "AboutController",
        controllerAs: "aboutCtrl"
    }).when('/users', {
        templateUrl:"./users/users.html",
        controller: "UsersController",
        controllerAs: "usersCtrl"
    }).when('/users/:userId', {
        templateUrl:"./user/user.html",
        controller: "UserController",
        controllerAs: "userCtrl"
    }).otherwise({
        redirectTo:"/"
    })
}
