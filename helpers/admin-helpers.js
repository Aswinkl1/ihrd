var db =require('../config/connection')
var collection = require("../config/collection")

module.exports={
    addstudent:(studentDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.STUDENT_COLLECTION).insertOne(studentDetails).then(()=>{
                console.log("everything is alwrite");
            })
        })
    }
}