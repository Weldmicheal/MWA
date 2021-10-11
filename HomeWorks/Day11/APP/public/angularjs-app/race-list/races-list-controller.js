angular.module("olympicRaces").controller("RacesController", RacesController)

function RacesController(RacesFactory, $window) {
    const vm = this
    //vm.count = 5;
    vm.offset = 0;
    vm.raceParams = false;
    vm.name = 0;
    vm.title = "Tokyo 2020 Olympics Races"
    vm.numberofRaces = [5, 10, 15]
    RacesFactory.getAllRaces(vm.offset).then(function (races) {
        vm.races = races
        const raceObj = JSON.parse(JSON.stringify(races))
        if (raceObj.length < 5) {
            vm.offset = 0
        } else {
            vm.offset = 5
        }
    })
    vm.addRace = function () {
        const postData = {
            name: vm.raceRace,
            numPlayers: vm.raceNumPlayers,
            country: vm.raceCountry
        }
        console.log(vm.raceForm.$dirty);
        console.log(vm.raceForm.$valid);

        if (vm.raceForm.$dirty && vm.raceForm.$valid) {
            RacesFactory.addOneRace(postData)
                .then(function (response) {
                    console.log("Race saved");
                    if (response.data) {
                        vm.raceRace = ''
                        vm.raceNumPlayers = ''
                        vm.raceCountry = ''
                        $window.location.href = "#!/races"
                    } else {
                        console.log("error");
                    }
                })
        }
    }

    

    vm.delete = function (id) {
        vm.message = ""
        RacesFactory.deleteOneRace(id).then(function (res) {
            console.log(res);
            if (!res.status) {
                vm.status = true
                $window.location.href = "#!/races"
                if (vm.offset - 5 >= 0) {
                    vm.offset -= 5
                }
                RacesFactory.getAllRaces(vm.offset).then(function (races) {
                    vm.races = races
                    const raceObj = JSON.parse(JSON.stringify(races))
                    if (raceObj.length < 5) {
                        vm.offset = 0
                    } else {
                        vm.offset += 5
                    }
                })
            } else {
                vm.status = false
                vm.message = "Error deleting Race !"
            }


        })
    }

    vm.next = function () {


        console.log(vm.offset);
        RacesFactory.getAllRaces(vm.offset).then(function (races) {
            vm.races = races
            const raceObj = JSON.parse(JSON.stringify(races))
            if (raceObj.length < 5) {
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
        RacesFactory.getAllRaces(vm.offset).then(function (races) {
            vm.races = races

        })
    }


    vm.getNRaces = (num) => {
        if (num) {
            count = parseInt(num);
            RacesFactory.getAllNRaces(0, count).then((response) => {
                vm.races = response;
                vm.selectedNumber = 0;
            });
            vm.selectedNumber = 0;
        }

    }

    vm.findRace = function () {
        if (vm.name) {
            name = vm.name            
            console.log(name);
            RacesFactory.getAllRacesByName(name).then(function (races) {

                vm.races = races
            })
        } else {
            vm.raceParams = true
        }

    }

    vm.goToCountryPage = function(raceId){
        $window.location.href = "#!/races/" + raceId + "/countr"
    }
    vm.viewParticipantCountries = function(raceId){
        $window.location.href = "#!/races/" + raceId + "/countries"
    }
}