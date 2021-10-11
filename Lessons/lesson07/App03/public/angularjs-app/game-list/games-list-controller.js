angular.module("meanGames").controller("GamesController", GamesController)

function GamesController(GamesFactory) {
    const vm = this
    vm.offset = 0;
    vm.title = "MEAN Games App"
    GamesFactory.getAllGames(vm.offset).then(function (games) {
        vm.games = games
        vm.offset = 5
    })
    vm.addGame = function () {
        const postData = {
            title: vm.gameTitle,
            price: vm.gamePrice
        }
        console.log(vm.gameForm.$dirty);
        console.log(vm.gameForm.$valid);
        if (vm.gameForm.$dirty && vm.gameForm.$valid) {
            GamesFactory.addOneGame(postData)
                .then(function (response) {
                    console.log("Game saved");
                })
        }
    }

    vm.next = function () {
        
        vm.offset += 5
        console.log(vm.offset);
        GamesFactory.getAllGames(vm.offset).then(function (games) {
            vm.games = games
           
        })
    }
    vm.back = function () {
        
        vm.offset -= 5
        if(vm.offset <= 0){
            vm.offset = 0
        }
        GamesFactory.getAllGames(vm.offset).then(function (games) {
            vm.games = games
            
        })
    }
}