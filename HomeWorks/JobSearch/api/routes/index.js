const express = require("express")
const controllerJobs = require("../controller/jobs.controller")
const controllerLocations = require("../controller/locations.controller")

const router = express.Router()

router.route("/jobs")
    .get(controllerJobs.jobsGetAll)

router.route("/jobs/new")
     .post(controllerJobs.jobsAddOne)

router.route("/jobs/:jobId")
     .get(controllerJobs.jobsGetOne)

router.route("/jobs/:jobId")
     .delete(controllerJobs.jobsDeleteOne)

router.route("/jobs/:jobId")
     .put(controllerJobs.jobsUpdateOne)
     

    

     // locations
router.route("/jobs/:jobId/locations")
     .get(controllerLocations.locationsGetAll)

router.route("/jobs/:jobId/locations/:locationId")
     .get(controllerLocations.locationsGetOne)

router.route("/jobs/:jobId/locations")
     .post(controllerLocations.locationsAddAll)

router.route("/jobs/:jobId/locations/:locationId")
     .delete(controllerLocations.locationsDeleteOne)

router.route("/jobs/:jobId/locations/:locationId")
     .put(controllerLocations.locationsUpdateOne)


module.exports = router;