angular.module("Jobs").controller("JobsController", JobsController)

function JobsController(JobsFactory, $window) {
    const vm = this
    
    vm.offset = 0;
    vm.title = " Jobs App"
    vm.numberofJobs = [5, 10, 15]
    JobsFactory.getAllJobs(vm.offset).then(function (jobs) {
        vm.jobs = jobs
        const jobObj = JSON.parse(JSON.stringify(jobs))
        if(jobObj.length < 5){
            vm.offset = 0
        }else{
        vm.offset = 5
        }
    })
    vm.addJob = function () {
        const postData = {
            title: vm.jobTitle,
            salary: vm.jobSalary,
            description: vm.jobDescription,
            postDate: vm.jobPostDate
        }
        console.log("date", vm.jobPostDate );
        console.log(vm.jobForm.$dirty);
        console.log(vm.jobForm.$valid);
        if (vm.jobForm.$dirty && vm.jobForm.$valid) {
            JobsFactory.addOneJob(postData)
                .then(function (response) {
                    console.log("Job saved");
                })
        }
    }

    vm.delete = function (id){
        vm.message = ""
        JobsFactory.deleteOneJob(id).then(function(res){
            console.log(res);
            if(!res.status){
                vm.status = true
                $window.location.href = "#!/jobs"
                if(vm.offset - 5 >= 0){
                    vm.offset -= 5
                }
                JobsFactory.getAllJobs(vm.offset).then(function (jobs) {
                    vm.jobs = jobs
                    const jobObj = JSON.parse(JSON.stringify(jobs))
                    if(jobObj.length < 5){
                        vm.offset = 0
                    }else{
                    vm.offset += 5
                    }
                })
            }else{
                vm.status = false
                vm.message = "Error deleting Job !"
            }     
            
        
    })
    }

    vm.next = function () {
        
        vm.offset += 5
        console.log(vm.offset);
        JobsFactory.getAllJobs(vm.offset).then(function (jobs) {
            vm.jobs = jobs
            const jobObj = JSON.parse(JSON.stringify(jobs))
        if(jobObj.length < 5){
            vm.offset = 0
        }
           
        })
    }
    vm.previous = function () {
        
        vm.offset -= 5
        if(vm.offset <= 0){
            vm.offset = 0
        }
        JobsFactory.getAllJobs(vm.offset).then(function (jobs) {
            vm.jobs = jobs
            
        })
    }

    const getNJobs = function(numOfJobs){
        console.log("numOfJobs ", numOfJobs);
    }
}