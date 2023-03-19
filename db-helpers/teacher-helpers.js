const password1 = require('../config/password')
const mail = require('../config/mail')
var dbStud = require('../model/student-schema')
const dbTeach = require('../model/teacher-schema')
const dbAttandance = require('../model/attendence-schema')
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
    },
    studentAttandance:(details)=>{
        // console.log(details);
       let sub =details.sub
        return new Promise((resolve,reject)=>{
            try{

            
            dbAttandance.attendence.exists({course:details.course,year:details.year}).then((result)=>{
                if(result){
                    dbAttandance.attendence.findById(result).then( async(data)=>{
                        if(data[sub]){
                            console.log("i am inside");
                        }else{
                            console.log(details.sub);
                        //    console.log( details[sub]);
                            data[sub]=details[sub] 
                            console.log(data[sub]);
                           await data.save()
                            console.log(data);
                            resolve()
                            
                            
                        }
                    })
                    
               
                }else{
                    console.log("i am not  inside result");
                    dbAttandance.attendence.create(details)
                    resolve()
                }
            })
        }catch(e){
            console.log(e);
        }
    }
        
        )

    }
}