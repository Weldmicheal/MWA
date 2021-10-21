angular.module("meanGames").controller("RegisterController", RegisterController)

function RegisterController(GamesFactory){
    var vm = this
    vm.register = function(){
        var user = {username: vm.username, password:vm.password }
        console.log(user);
        if(!vm.username || !vm.password){
            vm.err = "Please add a username and password"
        }else{
            if(vm.password !== vm.passwordRepeat){
                vm.err = "Please make sure the password matches"
            }else{                
                GamesFactory.addOneUser(user).then(function(result){
                    console.log(result);
                    vm.message = "Successful registration, please login"
                    vm.err = ""
                }).catch(function(err){
                    console.log(console.log(err));
                })
            }
        }
    }
}