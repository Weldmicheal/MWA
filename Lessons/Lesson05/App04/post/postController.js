angular.module("myPropperApp").controller("PostController", PostController)

function PostController($http, $routeParams) {
    const vm = this
    const postId = $routeParams.postId
    $http.get("https://jsonplaceholder.typicode.com/posts/" + postId)
        .then(function (response) {
            vm.joke = response.data
        })
}