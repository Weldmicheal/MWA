angular.module("myPropperApp").factory("PostFactory", PostFactory)

function PostFactory($http){
    return {
        getAllPosts:getAll,
        getOnePost: getOne
    }
    function getAll(){
        return $http.get("https://jsonplaceholder.typicode.com/users")
        .then(complete).catch(failed)
    }
    function getOne(postId){
        return $http.get("https://jsonplaceholder.typicode.com/users/" + postId)
        .then(complete).catch(failed)
    }


    function complete(response){
        return response.data

    }

    function failed(error){
        return error
    }
}