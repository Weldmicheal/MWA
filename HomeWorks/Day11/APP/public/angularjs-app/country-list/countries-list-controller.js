angular.module("olympicRaces").controller("CountriesController", CountriesController)

function CountriesController(RacesFactory, $routeParams){
    const vm = this

    vm.showHiddenFlag = false
    vm.hideAddButton = false
    const raceId = $routeParams.raceId

   
        RacesFactory.getAllCountries(raceId).then(function(response){
            if(!response.status){
                vm.countries = response
            }else{
                console.log("error returning countries");
            }
        })

        vm.showHidden = function(){
            vm.showHiddenFlag = true
            vm.hideAddButton = true
        }

        vm.addParticipant = function(){
            const newCountry = {
                county: vm.raceCountry,
                numPlayers: vm.raceNumPlayers
            }
    
            RacesFactory.addOneCountry(raceId,newCountry).then(function(response){
                console.log(response);
                if(!response.staus){
    
                    RacesFactory.getAllCountries(raceId).then(function(response){
                        if(!response.status){
                            vm.countries = response
                        }else{
                            console.log("error returning countries");
                        }
                    })
                }else{
                    console.log("Error in adding country");
                }
            })
        }
    
    
}