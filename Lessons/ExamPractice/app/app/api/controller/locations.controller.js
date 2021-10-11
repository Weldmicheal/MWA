const mongoose = require("mongoose")

const Job = mongoose.model("Job")


const _addLocations = function (req, res, job) {

    var existingLocationsLen;
    existingLocationsLen = job.locations.length

    if (existingLocationsLen == 1 && job.locations[0] === "") {
        existingLocationsLen = 0

    }
    job.locations[existingLocationsLen] = { name: req.body.name, location: req.body.location, date: req.body.date }



    job.save(function (err, updatedJob) {
        if (err) {
            console.log("Error adding locations");
            res.status(500).json(err)
            return
        } else {
            res.status(201).json(updatedJob.locations)
        }
    })
}

const _deleteLocation = function (req, res, job) {

    const locationId = req.params.locationId

    var existingLocationsLen = job.locations.length
    var index = -1;
    for (let i = 0; i < existingLocationsLen; i++) {
        if (job.locations[i].id === locationId) {
            index = i
            break;
        }
    }
    if (index != -1) {
        job.locations.splice(index, 1)
    }
    job.save(function (err, updatedJob) {
        if (err) {
            console.log("Error deleting location");
            res.status(500).json(err)
            return
        } else {
            res.status(201).json(updatedJob)
        }
    })
}


const _updateLocation = function (req, res, job) {

    const locationId = req.params.locationId

    var existingLocationsLen = job.locations.length
    var index = -1;
    for (let i = 0; i < existingLocationsLen; i++) {
        if (job.locations[i].id === locationId) {
            index = i
            break;
        }
    }
    var insertIdx;
    if (index != -1) {
        insertIdx = index
    } else {
        insertIdx = job.locations.length
    }
    job.locations[insertIdx] = { name: req.body.name, location: req.body.location, date: req.body.date }

    job.save(function (err, updatedJob) {
        if (err) {
            console.log("Error updating locations");
            res.status(500).json(err)
            return
        } else {
            res.status(201).json(updatedJob)
        }
    })
}


getAll = function (req, res) {
    const jobId = req.params.jobId
    if (!mongoose.isValidObjectId(jobId)) {
        console.log("\"" + jobId + "\" is invalid jobId");
        res.status(400).json({ "message": "\"" + jobId + "\" is invalid jobId" })
        return
    } else {
        Job.findById(jobId).select("locations").exec(function (err, docs) {
            if (err) {
                console.log(err);
                res.status(500).json(err)
                return
            } else {
                if (!docs) {
                    console.log("job id not found");
                    res.status(400).json({ "message": " job with id \"" + jobId + "\" not found" })
                    return
                } else {
                    res.status(200).json(docs.locations)
                }
            }
        })
    }
}

getOne = function (req, res) {
    const jobId = req.params.jobId
    const locationId = req.params.locationId

    if (!mongoose.isValidObjectId(jobId) || !mongoose.isValidObjectId(locationId)) {
        console.log("jobId and locationId should be valid");
        res.status(400).json({ "message": " jobId and/or locationId is invalid" })
        return
    } else {
        Job.findById(jobId).select("locations").exec(function (err, job) {
            if (err) {
                console.log(err);
                res.status(500).json(err)
                return
            } else {
                if (!job) {
                    console.log("Job Id not found");
                    res.status(404).json({ "message": "job \"" + jobId + "\" not found" })
                    return
                } else {
                    res.status(200).json(job.locations.id(locationId))
                }
            }
        })
    }
}


addAll = function (req, res) {

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
            if (!job) {
                console.log("Job with this id not available");
                res.status(404).json({ "message": "Job with id \"" + jobId + "\" not available" })
                return
            } else {
                console.log("job found");
                _addLocations(req, res, job)
            }

        }

    })
}

deleteOne = function (req, res) {
    const jobId = req.params.jobId
    if (!mongoose.isValidObjectId(jobId)) {
        console.log("\"" + jobId + "\" is invalid jobId");
        res.status(400).json({ "message": "\"" + jobId + "\" is invalid jobId" })
        return
    } else {
        Job.findById(jobId).exec(function (err, job) {
            if (err) {
                console.log("Error finding the job");
                res.status(500).json(err)
                return
            } else {
                if (!job) {
                    console.log("Job with this id not available");
                    res.status(404).json({ "message": "Job with id \"" + jobId + "\" not available" })
                    return
                } else {
                    console.log("job found");
                    _deleteLocation(req, res, job)
                }

            }

        })

    }
}

updateOne = function (req, res) {
    const jobId = req.params.jobId
    if (!mongoose.isValidObjectId(jobId)) {
        console.log("\"" + jobId + "\" is invalid jobId");
        res.status(400).json({ "message": "\"" + jobId + "\" is invalid jobId" })
        return
    } else {
        Job.findById(jobId).exec(function (err, job) {
            if (err) {
                console.log("Error finding the job");
                res.status(500).json(err)
                return
            } else {
                if (!job) {
                    console.log("Job with this id not available");
                    res.status(404).json({ "message": "Job with id \"" + jobId + "\" not available" })
                    return
                } else {
                    console.log("job found");
                    _updateLocation(req, res, job)
                }

            }

        })

    }
}

module.exports = {
    locationsGetAll: getAll,
    locationsGetOne: getOne,
    locationsAddAll: addAll,
    locationsDeleteOne: deleteOne,
    locationsUpdateOne: updateOne
}