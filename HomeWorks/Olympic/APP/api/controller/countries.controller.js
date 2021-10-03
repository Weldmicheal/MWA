const mongoose = require("mongoose")

const Racing = mongoose.model("Racing")


const _addCountries = function (req, res, racing) {


    var existingCountriesLen;
    existingCountriesLen = racing.countries.length
    var countries = JSON.parse(JSON.stringify(req.body))
    //countries = countries.countries
    const numPlayersLength = countries.length
    console.log("hiiiiii ", numPlayersLength);
    for (let i = 0; i < numPlayersLength; i++) {
        racing.countries[i + existingCountriesLen] = { name: countries[i].name, numPlayers: countries[i].numPlayers }

    }
    racing.save(function (err, updatedRacing) {
        if (err) {
            console.log("Error adding countries");
            res.status(500).json(err)
            return
        } else {
            res.status(201).json(updatedRacing.countries)
        }
    })
}

const _deleteCountry = function (req, res, racing) {

    const countryId = req.params.countryId
    if (!mongoose.isValidObjectId(countryId)) {
        console.log("\"" + countryId + "\" is invalid countryId");
        res.status(400).json({ "message": "\"" + countryId + "\" is invalid countryId" })
        return
    }
    var existingCountriesLen = racing.countries.length
    var index = -1;
    for (let i = 0; i < existingCountriesLen; i++) {
        if (racing.countries[i].id === countryId) {
            index = i
            break;
        }
    }
    if (index != -1) {
        racing.countries.splice(index, 1)
    }else{
            console.log("country Id not found");
            res.status(404).json({ "message": "country with id \"" + countryId + "\" not found" })
            return        
    }
    racing.save(function (err, updatedRacing) {
        if (err) {
            console.log("Error deleting numPlayers");
            res.status(500).json(err)
            return
        } else {
                res.status(200).json({ "message": "deleted successfully" })
            
        }
    })
}


const _updateCountry = function (req, res, racing) {

    const countryId = req.params.countryId
    if (!mongoose.isValidObjectId(countryId)) {
        console.log("\"" + countryId + "\" is invalid countryId");
        res.status(400).json({ "message": "\"" + countryId + "\" is invalid countryId" })
        return
    }
    var existingCountriesLen = racing.countries.length
    var index = -1;
    for (let i = 0; i < existingCountriesLen; i++) {
        if (racing.countries[i].id === countryId) {
            index = i
            break;
        }
    }
    var insertIdx;
    if (index != -1) {
        insertIdx = index
    } else {
        insertIdx = racing.countries.length
    }
    racing.countries[insertIdx] = { name: req.body.name, numPlayers: req.body.numPlayers }

    racing.save(function (err, updatedRacing) {
        if (err) {
            console.log("Error updating countries");
            res.status(500).json(err)
            return
        } else {
            res.status(201).json(updatedRacing)
        }
    })
}


getAll = function (req, res) {
    const racingId = req.params.racingId
    if (!mongoose.isValidObjectId(racingId)) {
        console.log("\"" + racingId + "\" is invalid racingId");
        res.status(400).json({ "message": "\"" + racingId + "\" is invalid racingId" })
        return
    } else {
        Racing.findById(racingId).select("countries").exec(function (err, docs) {
            if (err) {
                console.log(err);
                res.status(500).json(err)
                return
            } else {
                if (!docs) {
                    console.log("racing id not found");
                    res.status(400).json({ "message": " racing with id \"" + racingId + "\" not found" })
                    return
                } else {
                    res.status(200).json(docs.countries)
                }
            }
        })
    }
}

getOne = function (req, res) {
    const racingId = req.params.racingId
    const countryId = req.params.countryId

    if (!mongoose.isValidObjectId(racingId)) {
        console.log("racingId should be valid");
        res.status(400).json({ "message": " racingId is invalid" })
        return
    } else if (!mongoose.isValidObjectId(countryId)) {
        console.log("countryId should be valid");
        res.status(400).json({ "message": "  countryId is invalid" })
        return
    }
    else {
        Racing.findById(racingId).select("countries").exec(function (err, racing) {
            if (err) {
                console.log(err);
                res.status(500).json(err)
                return
            } else {
                if (!racing) {
                    console.log("Racing Id not found");
                    res.status(404).json({ "message": "racing \"" + racingId + "\" not found" })
                    return
                } else {
                    if (!racing.countries.id(countryId)) {
                        console.log("country Id not found");
                        res.status(404).json({ "message": "country with id \"" + countryId + "\" not found" })
                        return
                    } else {
                        res.status(200).json(racing.countries.id(countryId))
                    }
                }
            }
        })
    }
}


addAll = function (req, res) {

    const racingId = req.params.racingId
    console.log(racingId);
    if (!mongoose.isValidObjectId(racingId)) {
        console.log("\"" + racingId + "\" is invalid racingId");
        res.status(400).json({ "message": "\"" + racingId + "\" is invalid racingId" })
        return
    }
    Racing.findById(racingId).exec(function (err, racing) {
        if (err) {
            console.log("Error finding the racing");
            res.status(500).json(err)
            return
        } else {
            if (!racing) {
                console.log("Racing with this id not available");
                res.status(404).json({ "message": "Racing with id \"" + racingId + "\" not available" })
                return
            } else {
                console.log("racing found");
                _addCountries(req, res, racing)
            }

        }

    })
}

deleteOne = function (req, res) {
    const racingId = req.params.racingId
    if (!mongoose.isValidObjectId(racingId)) {
        console.log("\"" + racingId + "\" is invalid racingId");
        res.status(400).json({ "message": "\"" + racingId + "\" is invalid racingId" })
        return
    } else {
        Racing.findById(racingId).exec(function (err, racing) {
            if (err) {
                console.log("Error finding the racing");
                res.status(500).json(err)
                return
            } else {
                if (!racing) {
                    console.log("Racing with this id not available");
                    res.status(404).json({ "message": "Racing with id \"" + racingId + "\" not available" })
                    return
                } else {
                    console.log("racing found");
                    _deleteCountry(req, res, racing)
                }

            }

        })

    }
}

updateOne = function (req, res) {
    const racingId = req.params.racingId
    if (!mongoose.isValidObjectId(racingId)) {
        console.log("\"" + racingId + "\" is invalid racingId");
        res.status(400).json({ "message": "\"" + racingId + "\" is invalid racingId" })
        return
    } else {
        Racing.findById(racingId).exec(function (err, racing) {
            if (err) {
                console.log("Error finding the racing");
                res.status(500).json(err)
                return
            } else {
                if (!racing) {
                    console.log("Racing with this id not available");
                    res.status(404).json({ "message": "Racing with id \"" + racingId + "\" not available" })
                    return
                } else {
                    console.log("racing found");
                    _updateCountry(req, res, racing)
                }

            }

        })

    }
}

module.exports = {
    countriesGetAll: getAll,
    countriesGetOne: getOne,
    countriesAddAll: addAll,
    countriesDeleteOne: deleteOne,
    countriesUpdateOne: updateOne
}