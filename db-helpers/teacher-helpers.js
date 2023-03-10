const password1 = require('../config/password')
const mail = require('../config/mail')
var dbStud = require('../model/student-schema')
const dbTeach = require('../model/teacher-schema')
const bycrpt = require('bcrypt')


module.exports={
    teacherLogin:(loginDetails)=>{
        resp={}
        return new Promise(async(resolve,reject)=>{
            // console.log(loginDetails);
           let teacher1= await dbTeach.Teacher.findOne({email:loginDetails.email}).then((teacher)=>{
            if(teacher){
                

              bycrpt.compare(loginDetails.password,teacher.password).then((result)=>{
                if (result) {
                    console.log(result);
                    if(teacher.admin){
                        
                        resp.adminLoggedIn=true
                        resp.user=teacher
                        console.log(resp);
                        resolve(resp)
                    }else{

                    console.log('login successfull');
                    resp.loggedIn=true
                    resp.user=teacher
                    resolve(resp)
                    }
                }else{
                    console.log("login failed");
                    resolve({passwordNotMatch:true})
                }
               })

            }else{
                resolve({noUser:true})
            }
           })
          
        })
    }
}