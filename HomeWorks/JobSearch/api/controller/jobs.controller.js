
const mongoose = require("mongoose")
const Job = mongoose.model("Job")

const runGeoSerach = function(req, res){
    const lat = parseFloat(req.query.lat)
    const lng = parseFloat(req.query.lng)
    const maxDist = parseFloat(req.query.maxDist)|| 1000
    const minDist = parseFloat(req.query.minDist) || 0

    const query = {
        "publisher.location": {
            $near: {
                $geometry:{
                    type: "Point",
                    coordinates:[lng, lat]
                },
                $maxDistance: maxDist,
                $minDistance:minDist
            
            }
        }
    }

    Job.find(query).exec(function(err, jobs){
        console.log("Geo search");
        res.status(200).json(jobs)
    })
}


getAll = function (req, res) {    
   
    if(req.query && req.query.lng && req.query.lat){
        runGeoSerach(req, res)
        return
    }

    
    let offset = req.query.offset
    let count = 5;
    //let
    const maxCount = 15
    if (isNaN(offset) || offset < 0  || isNaN(count) || count < 0) {
        console.log("QueryString offset and Count should be numbers");
        res.status(400).json({ "message": "QueryString offset and Count should be numbers" })
        return
    }
    if (req.query && req.query.offset && req.query.offset) {
        offset = parseInt(req.query.offset)
    }else{
        offset = 0;
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count)
        if (count > maxCount) {
            count = maxCount
        }
    }
   
    Job.find().skip(offset).limit(count).exec(function (err, jobs) {
        if (err) {
            console.log("Error finding jobs");
            res.status(500).json(err)
        } else {
            console.log("jobs retrieved");
            res.status(200).json(jobs)
        }

    })

}

getOne = function (req, res) {

    const jobId = req.params.jobId
    if (!mongoose.isValidObjectId(jobId)) {
        console.log("\"" + jobId + "\" is invalid jobId");
        res.status(400).json({ "message": "\"" + jobId + "\" is invalid jobId" })
        return
    }
    Job.findById(jobId).exec(function (err, job) {
        if (err) {
            console.log("Error finding the job");
            res.status(500).json(err)
            return
        } else {
            if (job) {
                console.log("job found");
                res.status(200).json(job)
            } else {
                console.log("Job with this id not available");
                res.status(404).json({ "message": "Job with id \"" + jobId + "\" not available" })
            }

        }

    })

}

addOne = function (req, res) {

    var newJob = {
        title : req.body.title,
        salary : req.body.salary,
        description : req.body.description,
        skills : req.body.skills,
        postDate : req.body.postDate
       
    }
    console.log("post date", newJob.postDate);
    Job.create(newJob, function (err, response) {
        if (err) {
            res.status(500).json({ error: err })
            return
        }
        res.status(201).json(response.ops)
    })

}

deleteOne = function(req, res){
    const jobId = req.params.jobId;
    if(!mongoose.isValidObjectId(jobId)){
        console.log("jobId is invalid");
        res.status(400).json({"error":"\""+jobId +"\" is invalid jobId"})
        return
    }else{
        Job.findByIdAndRemove(jobId).exec(function(err, deletedJob){
            if(err){
                console.log("Error deleting job");
                res.status(500).json(err)
            }else {
                if(!deletedJob){
                    console.log("Job id not found");
                    res.status(404).json({"error":"\""+jobId+"\" not found"})
                }else{
                console.log("Deleted Successfully");
                res.status(204).json()
                }
            }
        })
    }
}

updateOne = function(req, res){
    const jobId = req.params.jobId;
    Job.findById(jobId).exec(function(err, job){
        if(err){
            console.log("Error finding job");
            res.status(500).json(err)
            return
        }else{
            if(!job){
                console.log("Job Id not found");
                res.status(404).json({"message":"\""+jobId + "\" not found"})
            }else{
                job.title = req.body.title;
                job.postDate = req.body.postDate
                job.salary = parseFloat(req.body.postDate);
                job.skills = req.body.skills;
                job.description = req.body.description
                
                job.save(function(err, updatedJob){
                    if(err){ 
                        console.log(err)
                        res.status(500).json(err)
                        return
                    }else{
                        res.status(204).json()
                    }
                })

            }
        }
    })
}

module.exports = {
    jobsGetAll: getAll,
    jobsGetOne: getOne,
    jobsAddOne: addOne,
    jobsDeleteOne : deleteOne,
    jobsUpdateOne : updateOne
}