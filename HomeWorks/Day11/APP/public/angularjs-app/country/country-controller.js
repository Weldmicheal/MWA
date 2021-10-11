angular.module("olympicRaces").controller("CountryController", CountryController)

function CountryController (RacesFactory, $routeParams){
    const vm = this
    const raceId = $routeParams[1]
    const countryId = $routeParams[1]
    console.log("routeParams ", countryId);

    
    RacesFactory.getOneCountry(raceId, countryId).then(function(response){
        vm.race = response
        console.log(response.postDate);
    })

   
    
}