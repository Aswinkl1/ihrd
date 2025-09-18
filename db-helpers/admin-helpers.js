const password1 = require('../config/password')
const mail = require('../config/mail')
var db = require('../model/student-schema')
const dbTeach = require('../model/teacher-schema')
const dbsub = require('../model/subject-schema')
const bycrpt = require('bcrypt') 
var dbStud = require('../model/student-schema')

const dbhome=require('../model/home-schema')
const { promises } = require('nodemailer/lib/xoauth2')


module.exports={
// ***************************************** Add Student *******************************************************************

    addstudent:async(studentDetails)=>{
       

       
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
            text:'your collageid is '+studentDetails.collageid+ '  your password is '+studentDetails.password,
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

    // ***************************************************************************************************************************

   //***************************************************** Add Teacher *********************************************************** 

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
    },

    // ****************************************************************************************************************************


    // ************************************************* Add Subject *************************************************************

    addSubject:(detail)=>{
      return new Promise((resolve,reject)=>{
        dbsub.subject.findOne({course:detail.course}).then(async(data)=>{

          if (data) {

           array =detail.details
          let dd = data.details.findIndex(e => e.sem ==array[0].sem);
              if(dd!=-1){
              dbsub.subject.updateOne({course:detail.course,'details.sem':array[0].sem},{
                $push:{'details.$.subject':{ "$each":array[0].subject  }}
              }).then((res)=>{
                console.log(res);
                console.log(array[0].subject);
                resolve()
              })
                console.log(dd);
                console.log(data);
              }else{
                console.log("i am not  inside dd");
                console.log(dd);
                data.details.push(array[0])
                await data.save()
                resolve()
              }
          }else{
            dbsub.subject.create(detail)
            resolve()
          }
        })
      })
    },

    // ***********************************************************************************************************************************
   
    removeSubject:(details)=>{
      return new Promise((resolve,reject)=>{
        // dbsub.subject.findOne({course:details.course}).then((result)=>{
        //   // console.log(result);
        // let res=  result.details.findIndex(e =>e.sem==details.sem)

        // let res1=  result.details[res].subject.findIndex(e =>e == details.subject)
        // // console.log(res1);
        //   if(res!=-1){
        //     if(res1!=-1){
        //    let resultArray=   result.details[res].subject.splice(res1,1)
        //       // result.details[res].subject = resultArray
        //       result.details[res].subject =result.details[res].subject
        //       console.log(result.details[res].subject);
        //       result.save()
        //     }
            
        //   }
        // // console.log(res);
          
        // })
        let subject= details.subject
        
        dbsub.subject.updateOne({course:details.course},{$pull:{details:{sem:details.sem}}}).then((result)=>{
          resolve()
        })
      })
    },
   
    postmail:(details)=>{
    return new Promise((resolve,reject)=>{
      if(details.fee ==0){
        dbStud.student.find({fee:details.fee},{_id:0,email:1}).then((data)=>{
          console.log(data);
        })
      }
      
    })
   },

   homeEdit:(details)=>{

    let data ={
      name:'home'
      

    }
    return new Promise((resolve,reject)=>{
      dbhome.home.findOne({name:'home'}).then((result)=>{
        if(result){
          result.home.pull(result.home)
          result.home.push(details.imagename)
          console.log("what");
          result.save()
          resolve(result.home)
        }else{
          dbhome.home.create(data)
        }
      })

      

    })

   },

   postEditCourse:(details)=>{
    return new Promise((resolve,reject)=>{
      dbhome.home.findOne({name:'home'}).then((result)=>{
        // console.log(result);
        if(result){
       let same=     result.course.findIndex(e =>e.name ==details.name)
      //  console.log(same);
            if(same==-1){
                console.log("i kldsklj");
              result.course.push(details)
              result.save()
              console.log("resolving imafe");
              resolve(details.image)
            }else{
              resolve(0)
            }
          
        }else{
          console.log("its not in databse");
        }
      })
    })
   },
   
   postEditFacilty:(details)=>{
    return new Promise((resolve,reject)=>{
      dbhome.home.findOne({}).then((result)=>{

        if(result){
          let same=  result.faciltities.findIndex(e =>e.name ==details.name)
         //  console.log(same);
               if(same==-1){
                result.faciltities.push(details)
                result.save()
                resolve(details.image)
               }else{
                 resolve(0)
               }
             
           }
        
      })
    })
   },

   postEditStaff:(details)=>{
    return new Promise((resolve,reject)=>{
      dbhome.home.findOne({}).then((result)=>{

        if(result){
          let same=  result.staf.findIndex(e =>e.name ==details.name)
         //  console.log(same);
               if(same==-1){
                result.staf.push(details)
                result.save()
                resolve(details.image)
               }else{
                 resolve(0)
               }
             
           }
        
      })
    })
   },

   postEditAlumini:(details)=>{
    return new Promise((resolve,reject)=>{
      dbhome.home.findOne({}).then((result)=>{

        if(result){
          let same=  result.aluminis.findIndex(e =>e.name ==details.name)
         //  console.log(same);
               if(same==-1){
                result.staf.push(details)
                result.save()
                resolve(details.image)
               }else{
                 resolve(0)
               }
             
           }
        
      })
    })
   },


   getHomePage:(details)=>{
      return new Promise((resolve,reject)=>{
        dbhome.home.findOne({}).then((result)=>{
          console.log(result);
          resolve(result)
    
        })
       }
      )
    
      }
  }
