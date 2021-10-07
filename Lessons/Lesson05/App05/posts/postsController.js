angular.module("myPropperApp").controller("PostsController", PostsController)

function PostsController(PostFactory) {
    const vm = this
    PostFactory.getAllPosts().then(function (response) {
        vm.posts = response;
    })


}