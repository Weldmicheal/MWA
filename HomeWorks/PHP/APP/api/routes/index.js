const express = require("express")
const controllerStudents = require("../controller/students.controller")
const controllerCourses = require("../controller/courses.controller")
const router = express.Router()

router.route("/students")
    .get(controllerStudents.studentsGetAll)

router.route("/students/new")
     .post(controllerStudents.studentsAddOne)

router.route("/students/:studentId")
     .get(controllerStudents.studentsGetOne)

router.route("/students/:studentId")
     .delete(controllerStudents.studentsDeleteOne)

router.route("/students/:studentId")
     .put(controllerStudents.studentsUpdateOne)
     



      
module.exports = router;