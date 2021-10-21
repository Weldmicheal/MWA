angular.module("meanGames").controller("WelcomeController", WelcomeController)


function WelcomeController(GamesFactory, $window){
    const vm = this

    vm.goToHome = function(){
        $window.location.href = "#!/"
    }

    vm.goToGames = function(){
        $window.location.href = "#!/games"

    }
    vm.goToRegister = function(){
        $window.location.href = "#!/register"

    }
}
