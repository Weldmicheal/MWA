angular.module("meanGames").controller("GameController", GameController)


function _getStarRating(stars){
    return new Array(stars)
}
function GameController(GamesFactory, $routeParams, $window){

    const vm = this
    const id = $routeParams.gameId
    GamesFactory.getOneGame(id).then(function(response){
        vm.game = response
        vm.rating= _getStarRating(response.rate)
    })

    vm.delete = function (){
        vm.message = ""
        GamesFactory.deleteOneGame(id).then(function(res){
            console.log(res);
            if(!res.status){
                vm.status = true
                $window.location.href = "#!/games"
            }else{
                vm.status = false
                vm.message = "Error deleting Game !"
            }     
            
        
    })
    }
}
