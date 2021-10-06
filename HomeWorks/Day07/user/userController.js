angular.module("myUserApp").controller("UserController", UserController)

function UserController($routeParams, UserFactory) {
    const vm = this
    const userId = $routeParams.userId
    UserFactory.getOneUser(userId)
        .then(function (response) {
            vm.user = response
        })
}