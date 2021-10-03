const mongoose = require("mongoose")

const Student = mongoose.model("Student")

getAll = function(req, res){
    const studentId = req.params.studentId
    if (!mongoose.isValidObjectId(studentId)) {
        console.log("\"" + studentId + "\" is invalid studentId");
        res.status(400).json({ "message": "\"" + studentId + "\" is invalid studentId" })
        return
    }else{
        Student.findById(studentId).select("courses").exec(function(err, docs){
            if(err){
                console.log(err);
                res.status(500).json(err)
                return
            }else{
                if(!docs){
                    console.log("course id not found");
                    res.status(400).json({"message": " course with id \""+ studentId +"\" not found"})
                    return
                }else{
                    res.status(200).json(docs.courses)
                }
            }
        })
    }
}

getOne = function(req, res){
    const studentId = req.params.studentId
    const courseCode = req.params.courseId

    if (!mongoose.isValidObjectId(studentId)) {
        console.log("studentId and courseId should be valid");
        res.status(400).json({ "message": " studentId and/or courseId is invalid" })
        return
    }else{
        Student.findById(studentId).select("courses").exec(function(err, studentt){
            if(err){
                console.log(err);
                res.status(500).json(err)
                return 
            }else{
                if(!studentt){
                    console.log("Student Id not found");
                    res.status(404).json({"message": "course \""+studentId+"\" not found"})
                    return 
                }else{
                    res.status(200).json(studentt.courses.find(course => course.code === courseCode))
                }
            }
        })
    }
}

module.exports = {
    coursesGetAll : getAll,
    coursesGetOne : getOne
}