angular.module("myPropperApp").controller("MainController", MainController)

function MainController($http){
    const vm = this
    vm.name = "Jack"

    $http.get("https://jsonplaceholder.typicode.com/posts")
        .then(function(response){
            vm.jokes = response.data
        })
}