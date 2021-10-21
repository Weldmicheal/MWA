angular.module("meanGames").factory("GameDataFactory", GameDataFactory);

function GameDataFactory($http) {
    return {
        getAllGames: getAllGames,
        getOneGame: getOneGame,
        postGame: postGame,
        // postUser:postUser,
    };
//  function postUser(user){
//      console.log("the user is",user);
//     return $http.post("/api/users/register/",user).then(complete).catch(failed);
//  }
    function getAllGames() {
        return $http.get("/api/games").then(complete).catch(failed);
    }

    function getOneGame(id) {
        return $http.get("/api/games/"+id).then(complete).catch(failed);
    }

    function postGame(game) {
        console.log("Adding Game");
        return $http.post("/api/games/", game).then(complete).catch(failed);
    }

    function complete(response){
        console.log("the user...");
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
}