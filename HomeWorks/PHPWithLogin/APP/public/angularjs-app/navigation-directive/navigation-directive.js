angular.module("olympicRaces").directive("racesNavigation", RacesNavigation)

function RacesNavigation(){
    return {
        restrict: "E",
        templateUrl: "angularjs-app/navigation-directive/navigation-directive.html"
    }
}