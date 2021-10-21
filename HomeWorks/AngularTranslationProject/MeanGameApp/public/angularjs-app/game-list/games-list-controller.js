angular.module("meanGames").controller("GamesController", GamesController)


function GamesController(GamesFactory, $window) {
    const vm = this
    //vm.count = 5;
    vm.offset = 0;
    vm.gameParams = false;
    vm.title = 0;
    vm.title = "Mean Games"
    vm.minimumberofGames = [5, 10, 15]
    GamesFactory.getAllGames(vm.offset).then(function (games) {
        vm.games = games
        const gameObj = JSON.parse(JSON.stringify(games))
        if (gameObj.length < 5) {
            vm.offset = 0
        } else {
            vm.offset = 5
        }
    })
    vm.addGame = function () {
        const newGame = {
            title: vm.gameTitle,
            price: vm.gamePrice,
            minPlayers: vm.gameMinimumPlayers,
            maxPlayers: vm.gameMaximumPlayers,
            minAge: vm.gameMinimumAge
        }
        console.log(vm.gameForm.$dirty);
        console.log(vm.gameForm.$valid);

        if (vm.gameForm.$dirty && vm.gameForm.$valid) {
            GamesFactory.addOneGame(newGame)
                .then(function (response) {
                    console.log("Game saved");
                    if (response.data) {
                        // vm.gameTitle = ''
                        // vm.gamePrice = ''
                        // vm.gameMinimumPlayers = ''  
                        // vm.gameMaximuPlayers = '' 
                        // vm.gameMinimumAge = ''                       
                        $window.location.href = "#!/games"
                    } else {
                        console.log("error");
                    }
                })
        }
    }

    

    vm.delete = function (id) {
        vm.message = ""
        GamesFactory.deleteOneGame(id).then(function (res) {
            console.log(res);
            if (!res.status) {
                vm.status = true
                $window.location.href = "#!/games"
                if (vm.offset - 5 >= 0) {
                    vm.offset -= 5
                }
                GamesFactory.getAllGames(vm.offset).then(function (games) {
                    vm.games = games
                    const gameObj = JSON.parse(JSON.stringify(games))
                    if (gameObj.length < 5) {
                        vm.offset = 0
                    } else {
                        vm.offset += 5
                    }
                })
            } else {
                vm.status = false
                vm.message = "Error deleting Game !"
            }


        })
    }

    vm.next = function () {

        GamesFactory.getAllGames(vm.offset).then(function (games) {
            vm.games = games
            const gameObj = JSON.parse(JSON.stringify(games))
            if (gameObj.length < 5) {
                vm.offset = 0
            } else {
                vm.offset += 5
            }

        })
    }
    vm.previous = function () {

        vm.offset -= 5
        if (vm.offset <= 0) {
            vm.offset = 0
        }
        GamesFactory.getAllGames(vm.offset).then(function (games) {
            vm.games = games

        })
    }


    vm.getNGames = (minimum) => {
        if (minimum) {
            count = parseInt(minimum);
            GamesFactory.getAllNGames(0, count).then((response) => {
                vm.games = response;
                vm.selectedMinimumber = 0;
            });
            vm.selectedMinimumber = 0;
        }

    }

    vm.findGame = function () {
        if (vm.title) {
            title = vm.title            
            console.log(title);
            GamesFactory.getAllGamesByName(title).then(function (games) {

                vm.games = games
            })
        } else {
            vm.gameParams = true
        }

    }

    
}