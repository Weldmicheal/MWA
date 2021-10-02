const mongoose = require("mongoose")
const Student = mongoose.model("Student")

getAll = function (req, res) {

    let offset = 0;
    let count = 5;
    const maxCount = 10
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset)
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count)
        if (count > maxCount) {
            count = maxCount
        }
    }
    if (isNaN(offset) || isNaN(count)) {
        console.log("QueryString offset and Count should be numbers");
        res.status(400).json({ "message": "QueryString offset and Count should be numbers" })
        return
    }
    Student.find().skip(offset).limit(count).exec(function (err, students) {
        if (err) {
            console.log("Error finding students");
            res.status(500).json(err)
        } else {
            console.log("students retrieved");
            res.status(200).json(students)
        }

    })

}

getOne = function (req, res) {

    const studentId = req.params.studentId
    if (!mongoose.isValidObjectId(studentId)) {
        console.log("\"" + studentId + "\" is invalid studentId");
        res.status(400).json({ "message": "\"" + studentId + "\" is invalid studentId" })
        return
    }
    Student.findById(studentId).exec(function (err, student) {
        if (err) {
            console.log("Error finding the student");
            res.status(500).json(err)
            return
        } else {
            if (student) {
                console.log("student found");
                res.status(200).json(student)
            } else {
                console.log("Student with this id not available");
                res.status(404).json({ "message": "Student with id \"" + studentId + "\" not available" })
            }

        }

    })

}

addOne = function (req, res) {

    var newStudent = {
        name : req.body.name,
        GPA : req.body.GPA
    }
    Student.create(newStudent, function (err, response) {
        if (err) {
            res.status(500).json({ error: err })
            return
        }
        res.status(201).json(response.ops)
    })

}

deleteOne = function(req, res){
    const studentId = req.params.studentId;
    if(!mongoose.isValidObjectId(studentId)){
        console.log("studentId is invalid");
        res.status(400).json({"error":"\""+studentId +"\" is invalid studentId"})
        return
    }else{
        Student.findByIdAndRemove(studentId).exec(function(err, deletedStudent){
            if(err){
                console.log("Error deleting student");
                res.status(500).json(err)
            }else {
                if(!deletedStudent){
                    console.log("Student id not found");
                    res.status(404).json({"error":"\""+studentId+"\" not found"})
                }else{
                console.log("Deleted Successfully");
                res.status(204).json()
                }
            }
        })
    }
}

updateOne = function(req, res){
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function(err, student){
        if(err){
            console.log("Error finding student");
            res.status(500).json(err)
            return
        }else{
            if(!student){
                console.log("Student Id not found");
                res.status(404).json({"message":"\""+studentId + "\" not found"})
            }else{
                student.title = req.body.title;
                student.year = parseInt(req.body.year);
                
                student.save(function(err, updatedStudent){
                    if(err){ 
                        console.log(err)
                        res.status(500).json(err)
                        return
                    }else{
                        res.status(204).json()
                    }
                })

            }
        }
    })
}

patchOne = function(req, res){
    const studentId = req.params.studentId

    if(!mongoose.isValidObjectId(studentId)){
        console.log("studentId not valid");
        res.status(400).json({"message":"\"" + studentId + "\" is invalid studentId"})
        
    }else{
        Student.findById(studentId).exec(function(err, student){
            if(err){
                console.log("Error finding student");
                res.status(500).json(err)
                return
            }else{
                if(!student){
                    console.log("student not found");
                    res.status(404).json({"message": "\" Student with id "+studentId+"\" not found"})
                    return
                }else{
                    let changes = req.body
                    let originalStudent = student 

                    if(changes.name !=="undefined"){
                        originalStudent.name = changes.name
                    }
                    if(!isNaN(changes.GPA)){
                        originalStudent.GPA = parseFloat(changes.GPA)
                    }

                    originalStudent.save(function(err, updatedStudent){
                        if(err){
                            console.log(err);
                            res.status(500).json(err)
                            return
                        }else{
                            console.log("Successfully updated");
                            res.status(204).json()
                        }
                    })
                }
            }
        })
    }
}

module.exports = {
    studentsGetAll: getAll,
    studentsGetOne: getOne,
    studentsAddOne: addOne,
    studentsDeleteOne : deleteOne,
    studentsUpdateOne : updateOne,
    studentsPatchOne : patchOne
}