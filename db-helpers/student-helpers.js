
const mail = require('../config/mail')
var dbStudent = require('../model/student-schema')
const dbTeach = require('../model/teacher-schema')
const bycrpt = require('bcrypt')

module.exports={

    studentLogin:(loginDetails)=>{
        
        resp={}
        return new Promise(async(resolve,reject)=>{
            console.log(loginDetails);
            await dbStudent.student.findOne({collageid:loginDetails.collageid}).then((student)=>{
            if(student){
                console.log(student);

              bycrpt.compare(loginDetails.password,student.password).then((result)=>{
                if (result) {
                    console.log('login successfull');
                    resp.loggedIn=true
                    resp.user=student
                    resolve(resp)
                }else{
                    console.log("login failed");
                    resolve({passwordNotMatch:true});
                }
               })

            }else{
                resolve({noUser:true})
            }
           })
          
        })
        }
    }
