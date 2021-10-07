angular.module("olympicRaces").controller("RacesController", RacesController)

function RacesController($http){
    const vm= this
    vm.title= "Tokyo 2020 Olympics Races"
    vm.races= $http.get("/api/races")
        .then(function(response){
            vm.races = response.data
        })
}