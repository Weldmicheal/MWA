angular.module("Jobs").controller("JobController", JobController)



function JobController(JobsFactory, $routeParams){

    const vm = this
    const id = $routeParams.jobId
    JobsFactory.getOneJob(id).then(function(response){
        vm.job = response
        console.log(response.postDate);
    })

  
}
