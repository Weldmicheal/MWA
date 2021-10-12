angular.module("olympicRaces").controller("LoginController", LoginController)

function LoginController($http, $location, $window, AuthFactory) {
    const vm = this

    vm.isLoggedIn = function () {
        if (AuthFactory.isLoggedIn) {
            return true
        } else {
            return false
        }
    }


    vm.login = function () {
        if (vm.username && vm.password) {
            var user = {
                username: vm.username,
                password: vm.password
            }
        }

        $http.post("/api/users/login", user)
            .then(function (response) {
                console.log(response);
            }).catch(function (err) {
                console.log(err);
            })
    }

    vm.logout = function(){

    }
    vm.isActiveTab = function(url){
        var currentPath = $location.path().split("/")[1]
        return(url == currentPath ? "active":"")
    }

}