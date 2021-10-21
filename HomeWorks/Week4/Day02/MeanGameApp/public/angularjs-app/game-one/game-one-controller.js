angular.module("meanGames").controller("GameController", GameController)


function _getStarRating(stars){
    return new Array(stars)
}
function GameController(GamesFactory, $routeParams, $window){

    const vm = this
    const id = $routeParams.gameId
    GamesFactory.getOneGame(id).then(function(response){
        vm.game = response
        console.log(response);
        vm.rating= _getStarRating(response.rate)
    })
    vm.showForm = function(){

        vm.updateFlag = true

    }
    vm.updateGame = function(){
        const gameId = $routeParams.gameId
        console.log("game Id: " , gameId);
        const updatedGame = {
            title: vm.gameTitle,
            price: vm.gamePrice,
            minPlayers: vm.gameMinimumPlayers,
            maxPlayers: vm.gameMaximumPlayers,
            minAge: vm.gameMinimumAge
        }
        GamesFactory.updateOneGame(gameId, updatedGame).then(function(response){

            if(!response.status){
                $window.location.href = "#!/games"
            }else{
                console.log("error updating");
            }

        })
    }
  
}
