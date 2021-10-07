angular.module("olympicRaces").controller("RaceController", RaceController)

function RaceController(RacesFactory, $routeParams){
    const vm = this
    const id = $routeParams.raceId
    RacesFactory.getOneRace(id)
        .then(function(response){
            vm.race = response
        })
}