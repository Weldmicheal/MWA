angular.module("meanGames").factory("GamesFactory", GamesFactory)

function GamesFactory($http){
    return {
        getAllGames: getAll,
        getOneGame: getOne,
        addOneGame: addOne,
        deleteOneGame : deleteOne,
        getAllNGames : getNGames,
        updateOneGame: updateOne,
        addOneUser : addOneUser

        
    }

   
    function getAll(offset){
        console.log("/api/games?offset\=" + offset);
        return $http.get("/api/games?offset=" + offset)
        .then(complete).catch(failed)
       
    }
    function getNGames(offset, count){
        return $http.get("/api/games?offset="+offset + "&count=" + count)
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
    function updateOne(gameId, game){
        return $http.put("/api/games/" + gameId, game)
            .then(complete).catch(failed)
    }
    function deleteOne(gameId){
        console.log("gameId", gameId);
        return $http.delete("/api/games/"+ gameId)
            .then(complete).catch(failed)
    }
    function addOneUser(user){
        return $http.post("/api/users/register", user)
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