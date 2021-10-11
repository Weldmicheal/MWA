angular.module("Jobs").factory("JobsFactory", JobsFactory)

function JobsFactory($http){
    return {
        getAllJobs: getAll,
        getOneJob: getOne,
        addOneJob: addOne,
        deleteOneJob : deleteOne,
    }

    function getAll(offset){
        console.log("/api/jobs?offset\=" + offset);
        return $http.get("/api/jobs?offset=" + offset)
        .then(complete).catch(failed)
       
    }

    function getOne(jobId){
        return $http.get("/api/jobs/"+ jobId)
            .then(complete).catch(failed)
    }
    function addOne(job){
        return $http.post("/api/jobs/new/", job)
            .then(complete).catch(failed)
    }
    function deleteOne(jobId){
        console.log("jobId", jobId);
        return $http.delete("/api/jobs/"+ jobId)
            .then(complete).catch(failed)
    }

    function complete(response){
        console.log("got response");
        return response.data;
    }
    function failed(error){
        console.log(error);
        return error
    }
}