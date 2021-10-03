const express = require("express")
const controllerOlympics = require("../controller/olympics.controller")
const controllerSports = require("../controller/sports.controller")

const router = express.Router()

router.route("/olympics")
    .get(controllerOlympics.olympicsGetAll)

router.route("/olympics/new")
     .post(controllerOlympics.olympicsAddOne)

router.route("/olympics/:olympicsId")
     .get(controllerOlympics.olympicsGetOne)

router.route("/olympics/:olympicsId")
     .delete(controllerOlympics.olympicsDeleteOne)

router.route("/olympics/:olympicsId")
     .put(controllerOlympics.olympicsUpdateOne)     

    

     // sports
// router.route("/olympics/:olympicsId/sports")
//      .get(controllerSports.sportsGetAll)

// router.route("/olympics/:olympicsId/sports/:sportId")
//      .get(controllerSports.sportsGetOne)

// router.route("/olympics/:olympicsId/sports")
//      .post(controllerSports.sportsAddAll)

// router.route("/olympics/:olympicsId/sports/:sportId")
//      .delete(controllerSports.sportsDeleteOne)

// router.route("/olympics/:olympicsId/sports/:sportId")
//      .put(controllerSports.sportsUpdateOne)


module.exports = router;