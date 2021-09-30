const express = require("express")
const result = require("../controller/mul.controller")
const router = express.Router()

router.route('/multiply/:parnum')
    .get(result.multiply)


module.exports = router