const password1 = require('../config/password')
const mail = require('../config/mail')
var db = require('../model/student-schema')
const dbTeach = require('../model/teacher-schema')
const bycrpt = require('bcrypt')


module.exports={
    addstudent:async(studentDetails)=>{
        // console.log(studentDetails)

       
        return new Promise( async(resolve,reject)=>{
              user =await db.student.findOne({collageid:studentDetails.collageid})
           if (user){
            resolve(0)
           } else{

           
        try{
          studentDetails.password = password1.newPassword()
        
          let details = {
            from:'caskuz04@gmail.com',
            to:studentDetails.email,
            subject:'your password',
            text:'your collageid is '+studentDetails.collageid+ 'your password is '+studentDetails.password,
          }
  
          studentDetails.password = await bycrpt.hash(studentDetails.password,10)
           await db.student.create(studentDetails).then((result)=>{
             mail.email(details)
           
            resolve(1)
          }).catch((e)=>{console.log(e);} )

        }catch(e){
          console.log(e.message);
          
        }
            
      }})
    },
    addTeacher:(teacherDetails)=>{
      return new Promise( async(resolve,reject)=>{
        user =await dbTeach.Teacher.findOne({email:teacherDetails.email})
        if (user){
         resolve(0)
        } else{

        
     try{
       teacherDetails.password = password1.newPassword()
     
       let details = {
         from:'caskuz04@gmail.com',
         to:teacherDetails.email,
         subject:'your password',
         text:'your collageid is '+teacherDetails.email+ 'your password is '+teacherDetails.password,
       }

       teacherDetails.password = await bycrpt.hash(teacherDetails.password,10)
       await dbTeach.Teacher.create(teacherDetails).then((result)=>{
          mail.email(details)
        
         resolve(1)
       }).catch((e)=>{console.log(e);} )

     }catch(e){
       console.log(e.message);
       
     }
         
   }})
    }
}
