angular.module("olympicRaces").controller("RaceController", RaceController)



function RaceController(RacesFactory, $routeParams, $window){

    const vm = this
    const id = $routeParams.raceId
    vm.updateFlag = false
    console.log("race Id1111111111: " , id);

    RacesFactory.getOneRace(id).then(function(response){
        vm.race = response
        console.log(response.postDate);
    })

    vm.showForm = function(){

        vm.updateFlag = true

    }
    vm.updateRace = function(){
        const raceId = $routeParams.raceId
        console.log("race Id: " , raceId);
        const updatedRace = {
            name: vm.raceRace,
            numPlayers: vm.raceNumPlayers,
            country: vm.raceCountry
        }
        RacesFactory.updateOneRace(raceId, updatedRace).then(function(response){

            if(!response.status){
                $window.location.href = "#!/races"
            }else{
                console.log("error updating");
            }

        })
    }
  
}
