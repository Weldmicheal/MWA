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
     
router.route("/students/:studentId")
     .patch(controllerStudents.studentsPatchOne)
 

      // courses
router.route("/students/:studentId/courses")
      .get(controllerCourses.coursesGetAll)
  
 
  router.route("/students/:studentId/courses/:courseId")
       .get(controllerCourses.coursesGetOne)
  
      
module.exports = router;