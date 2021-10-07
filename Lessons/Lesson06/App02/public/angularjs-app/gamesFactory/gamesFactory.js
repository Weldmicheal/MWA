angular.module("meanGames").factory("GamesFactory", GamesFactory)

function GamesController(){
    return {
        getAllGames: getAll
    }

    function getAll(){
        return  vm.games= $http.get("/api/games")
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