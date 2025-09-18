const password1 = require('../config/password')
const mail = require('../config/mail')
var dbStud = require('../model/student-schema')
const dbTeach = require('../model/teacher-schema')
const dbAttandance = require('../model/attendence-schema')
const dbsub = require('../model/subject-schema')
const bycrpt = require('bcrypt')


module.exports={

    // *************************************** Teacher Login ********************************************************

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

 // ***************************************************************************************************************************

// ********************************************* Student Attendence ***************************************************************

    studentAttandance:(details)=>{
        
       
      const subject =details.sub
     let arrayPath =[subject]+'.date'
     let absenteesPath =[subject]+'.$.absentees'
   
    
        return new Promise((resolve,reject)=>{
            try{

            
            dbAttandance.attendence.exists({course:details.course,year:details.year}).then((result)=>{
                if(result){
                    dbAttandance.attendence.findById(result).then( async(data)=>{
                        if(data[subject]){
                            let array= data[subject]
                            let array1=details[subject]
                             
                          let arrayres = array.findIndex(e => e.date == array1[0].date )
                          

                          if (arrayres!=-1) {
                            dbAttandance.attendence.updateOne({_id:result,[arrayPath]:array1[0].date },
                                {
                                    $push:{[absenteesPath]:{ "$each":array1[0].absentees  }}}).then((res)=>{

                                console.log(res);
                            })
                                
                          } else {
                                    dbAttandance.attendence.updateOne({_id:result},{$push:{[subject]:array1[0]}}).then((res)=>{
                                        console.log(res);
                                    })
                          }
                      
                        }else{

                        data.set(subject,details[subject])
                        await  data.save()
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

    },


    // *********************************************************************************************************************************


    getstudentid:(details)=>{
        return new Promise((resolve,reject)=>{
            dbStud.student.find({course:details.course,sem:details.sem},{collageid:1,_id:0}).then((result)=>{
                console.log(result);
              resolve(result)
                // console.log("kjghdsdfkhasd");
            })
        })
        
    },
    getSubject:(details)=>{
        console.log(details);
        return new Promise((resolve,reject)=>{
            dbsub.subject.find({course:details.course}).then((result)=>{
                // console.log(result[0].details);
                if(result[0]){
                    console.log(result[0].details);
                    let res =  result[0].details.find(e =>e.sem ==details.sem)
                    console.log(res);
                    if(res){
                        console.log(res);
                        resolve(res.subject)
                    }
                }
              
            //   console.log(res.subject);
            
             
            })
        })
    },

    getMark:(details)=>{
        
        return new Promise((resolve ,reject)=>{
            dbStud.student.find({collageid:details.collageid},{internals:1,_id:0}).then((result)=>{
               
                

                if(result[0].internals[0]){
                    let arrind=    result[0].internals.find(e=> e.subject == details.subject)

                    // console.log(arrind);
                    resolve(arrind)
                    
                }else{
                    resolve()
                    // result[0].internals.push()
                }
            })

        })
    },

    studentInternal:(mark)=>{
        // console.log(mark);

        

       

          let data2 ={
            outoff:mark.outoff,
            subject:mark.subject,
            test1:mark.test1,
            test2:mark.test2,
            attendence: mark.attendence,
            assignment: mark.assignment,
            seminar: mark.seminar
          }
        
        return new Promise((resolve,reject)=>{

            dbStud.student.find({collageid:mark.collageid}).then((result)=>{

            let arr=    result[0].internals.find( e=> e.subject == mark.subject);

            let arrind=    result[0].internals.findIndex(e=> e.subject == mark.subject)
                console.log(arr);
                 if(arr){

                    result[0].internals[arrind] =  Object.assign(result[0].internals[arrind],data2)
                    console.log( result[0].internals[arrind]);
                    result[0].save()
                    resolve()       
                    
                 }else{
                    result[0].internals.push(data2)
                    result[0].save()
                    console.log("not here");
                    resolve()
                 }
            })
        })
    },

    getCourseMark:(details)=>{

        return new Promise((resolve,reject)=>{
            dbsub.subject.find({}).then((result)=>{
                console.log(result);
                resolve(result)
            })
        })
       
    }


}

