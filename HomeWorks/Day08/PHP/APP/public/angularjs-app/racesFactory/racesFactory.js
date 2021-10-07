angular.module("olympicRaces").factory("RacesFactory", RacesFactory)

function RacesFactory($http){
    return {
        getAllRaces: getAll,
        getOneRace: getOne
    }

    function getAll(){
        return $http.get("/api/races")
            .then(complete).catch(failed)
    }
    function getOne(raceId){
        console.log("raceId", raceId);
        return $http.get("/api/races/" + raceId)
            .then(complete).catch(failed)
    }
    function complete(response){
        return response.data
    }

    function failed(error){
        return error
    }
}