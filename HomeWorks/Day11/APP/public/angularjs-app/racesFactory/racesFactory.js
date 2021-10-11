angular.module("olympicRaces").factory("RacesFactory", RacesFactory)

function RacesFactory($http){
    return {
        getAllRaces: getAll,
        getOneRace: getOne,
        addOneRace: addOne,
        deleteOneRace : deleteOne,
        getAllNRaces : getNRaces,
        updateOneRace: updateOne,
        addOneCountry : addCountry,
        getOneCountry : getCountry,
        getAllCountries : getCountries,
        getAllRacesByName : getRacesByName

    }

    function getAll(offset){
        console.log("/api/races?offset\=" + offset);
        return $http.get("/api/races?offset=" + offset)
        .then(complete).catch(failed)
       
    }

    function getCountries(raceId){
        return $http.get("/api/races/"+ raceId + "/countries")
        .then(complete).catch(failed)
       
    }

    function getNRaces(offset, count){
        return $http.get("/api/races?offset="+offset + "&count=" + count)
        .then(complete).catch(failed)
       
    }

    function getRacesByName(name){
        return $http.get("/api/races?name=" + name)
        .then(complete).catch(failed)
       
    }

    function getOne(raceId){
        return $http.get("/api/races/"+ raceId)
            .then(complete).catch(failed)
    }
    function getCountry(raceId, countryId){
        return $http.get("/api/races/"+ raceId + "/countries/" + countryId)
            .then(complete).catch(failed)
    }

    function addOne(race){
        return $http.post("/api/races/new/", race)
            .then(complete).catch(failed)
    }
    function updateOne(raceId, race){
        return $http.put("/api/races/" + raceId, race)
            .then(complete).catch(failed)
    }

    function addCountry(raceId, country){
        console.log("/api/races/" + raceId + "/countries")
        return $http.post("/api/races/" + raceId + "/countries", country)
            .then(complete).catch(failed)
    }

    function deleteOne(raceId){
        console.log("raceId", raceId);
        return $http.delete("/api/races/"+ raceId)
            .then(complete).catch(failed)
    }

    function complete(response){
        console.log("got response");
        return response.data;
    }
    function failed(error){
        console.log(error);
        return error
    }
}