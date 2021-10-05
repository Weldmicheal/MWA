const mongoose = require("mongoose")
const Student = mongoose.model("Student")

const _addCourses = function(req, res, student){
    const existingLen = student.courses.length
    var index = -1
    var newCoures = JSON.parse(JSON.stringify(req.body))
    var newLen = newCoures.length

    for(let i = 0; i < newLen; i++){
        student.courses[i + existingLen] = {code:newCoures[i].code, name:newCoures[i].name}
    }

    student.save(function(err, updatedStudent){
        if(err){
            res.status(500).json(err)
        }else{
            res.status(200).json(updatedStudent)
        }
    })

}
const _deleteCourse = function(req, res, student){
    const courseId = req.params.courseId
    const existingCourses = student.courses
    const len = existingCourses.length
    var index = -1
    
    for(let i = 0; i < len; i++){
        if(student.courses[i].code === courseId){
            index = i
            break
        }
    }
    if(index == -1){
        res.status(404).json({"message": "course not found"})
        return
    }else{
        student.courses.splice(index, 1)
    }
    //student.courses = existingCourses
    student.save(function(err, updatedStudent){
        if(err){
            res.status(404).json(err)
        }else{
            res.status(200).json({"message":"deleted successfuly"})
        }
    })


}

_updateCourses

getAll = function(req, res){
    const studentId = req.params.studentId
    const courseId = req.params.courseId

    if(!mongoose.isValidObjectId(studentId)){
        res.status(404).json({"message": "student id is invalid"})
        return
    }
    Student.findById(studentId).select("courses").exec(function(err, studentt){
            if(err){
                res.status(500).json(err)
            }else{
                if(!studentt){
                    res.status(404).json({"message": "student not found"})
                }else{
                    res.status(200).json(studentt.courses)
                }
            }
    })
}

getOne = function(req, res){
    const studentId = req.params.studentId
    const courseId = req.params.courseId
    if(!mongoose.isValidObjectId(studentId)){
        res.status(404).json({"message": "student id is invalid"})
        return
    }

    Student.findById(studentId).exec(function(err, student){
        if(err){
            res.status(500).json(err)
        }else{
            if(!student){
                res.status(404).json({"message": "student not found"})
                return
            }else{
                res.status(200).json(student.courses.find(c=>c.code = courseId))
            }
        }

    })


}

addAll = function(req, res){

    console.log("hhhhhhhhhhhhhhhhhhh");
    const studentId = req.params.studentId

    //const newStudent = {code:req.body.code, name: req.body.name}

    if(!mongoose.isValidObjectId(studentId)){
        res.status(404).json({"message": "student id is invalid"})
        return
    }

    Student.findById(studentId).exec(function(err, student){
        if(err){
            res.status(500).json(err)
        }else{
            if(!student){
                res.status(404).json({"message": "student not found"})
            }else{
                _addCourses(req, res, student)
            }
        }
    })

}

deleteOne = function(req, res){
    const studentId = req.params.studentId


    if(!mongoose.isValidObjectId(studentId)){
        res.status(404).json({"message": "student id is invalid"})
        return
    }
    Student.findById(studentId).exec(function(err, student){
        if(err){
            res.status(500).json(err)
        }else{
            if(!student){
                res.status(404).json({"message": "student not found"})
                return
            }else{
                _deleteCourse(req, res, student)
            }
        }
    })
}

deleteOne = function(req, res){
    const studentId = req.params.studentId
    if(!mongoose.isValidObjectId(studentId)){
        res.status(404).json({"message": "student id is invalid"})
        return
    }
    Student.findById(studentId).exec(function(err, student){
        if(err){
            res.status(500).json(err)
        }else{
            if(!student){
                res.status(404).json({"message": "student not found"})
            }else{
                _updateCourses(req, res, student)
            }
        }
    })

}

module.exports = {
    coursesGetAll : getAll,
    coursesGetOne : getOne,
    coursesAddAll : addAll,
    coursesDeleteOne : deleteOne
}