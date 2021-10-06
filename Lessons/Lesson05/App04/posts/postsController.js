angular.module("myPropperApp").controller("PostsController", PostsController)

function PostsController($http){
    const vm = this
    vm.name = "Jack"
    $http.get("https://jsonplaceholder.typicode.com/posts")
        .then(function(response){
            vm.jokes = response.data
        })
}