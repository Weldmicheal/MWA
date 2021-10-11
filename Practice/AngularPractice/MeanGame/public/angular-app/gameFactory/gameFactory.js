angular.module("meanGames").factory("GameFactory", GameFactory)

function GameFactory($http){
    return {
        gamesGetAll : getAll,
        gamesGetOne : getOne
    }

    function getAll(){
        return $http.get("/api/games")
            .then(complete).catch(failed)
    }

    function getOne(gameId){
        return $http.get("/api/games/" + gameId)
            .then(complete).catch(failed)
    }

    function complete(response){
        return response.data
    }
    function failed(error){
        return error
    }
}