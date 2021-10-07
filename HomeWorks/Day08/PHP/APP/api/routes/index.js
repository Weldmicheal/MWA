const express = require("express")
const controllerRaces = require("../controller/races.controller")
const controllerCountries = require("../controller/countries.controller")
const router = express.Router()

router.route("/races")
    .get(controllerRaces.racesGetAll)

router.route("/races/new")
     .post(controllerRaces.racesAddOne)

router.route("/races/:racingId")
     .get(controllerRaces.racesGetOne)

router.route("/races/:racingId")
     .delete(controllerRaces.racesDeleteOne)

router.route("/races/:racingId")
     .put(controllerRaces.racesUpdateOne)
     
     // countries
router.route("/races/:racingId/countries")
     .get(controllerCountries.countriesGetAll)

router.route("/races/:racingId/countries/:countryId")
     .get(controllerCountries.countriesGetOne)

router.route("/races/:racingId/countries")
     .post(controllerCountries.countriesAddAll)

router.route("/races/:racingId/countries/:countryId")
     .delete(controllerCountries.countriesDeleteOne)

router.route("/races/:racingId/countries/:countryId")
     .put(controllerCountries.countriesUpdateOne)




      
module.exports = router;