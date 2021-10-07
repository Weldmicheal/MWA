angular.module("myUserApp").factory("UserFactory", UserFactory)

function UserFactory($http){
    return {
        getAllUsers:getAll,
        getOneUser: getOne
    }
    function getAll(){
        return $http.get("https://jsonplaceholder.typicode.com/users")
        .then(complete).catch(failed)
    }
    function getOne(userId){
        return $http.get("https://jsonplaceholder.typicode.com/users/" + userId)
        .then(complete).catch(failed)
    }

    function complete(response){
        return response.data

    }

    function failed(error){
        return error
    }
}