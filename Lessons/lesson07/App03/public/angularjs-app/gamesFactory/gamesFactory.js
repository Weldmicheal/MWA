angular.module("meanGames").factory("GamesFactory", GamesFactory)

function GamesFactory($http){
    return {
        getAllGames: getAll,
        getOneGame: getOne,
        addOneGame: addOne,
        deleteOneGame : deleteOne,
    }

    function getAll(offset){
        console.log("/api/games?offset\=" + offset);
        return $http.get("/api/games?offset=" + offset)
        .then(complete).catch(failed)
       
    }

    function getOne(gameId){
        return $http.get("/api/games/"+ gameId)
            .then(complete).catch(failed)
    }
    function addOne(game){
        return $http.post("/api/games/new/", game)
            .then(complete).catch(failed)
    }
    function deleteOne(gameId){
        console.log("gameId", gameId);
        return $http.delete("/api/games/"+ gameId)
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