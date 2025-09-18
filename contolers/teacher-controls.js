var adminhelper = require('../db-helpers/admin-helpers')
const teacherhelper = require('../db-helpers/teacher-helpers')
var express = require('express');
var router = express.Router();


module.exports={

  // *********************************************** Get Teacher ************************************************************

    getTeacherLogin:(req,res)=>{
          
      if(req.session.adminLoggedIn){
        res.redirect('/admin')
      }else{

    
        if (req.session.teacherLoggedIn) {
            res.redirect('/teacher')
          }
           else {
            
            if (req.session.passwordNotMatch) {
              let passwordNotMatch = req.session.passwordNotMatch
              req.session.passwordNotMatch=false
              res.render('./login/teacher-login',{passwordNotMatch,noUser:false})            
            }
           
            else if (req.session.noUser) {
              let noUser = req.session.noUser
              req.session.noUser=false
              res.render('./login/teacher-login',{passwordNotMatch:false,noUser})
            }
            else{
              res.render('./login/teacher-login',{passwordNotMatch:false,noUser:false})
            }
          
            
          }
       }
      
    },

    // ************************************************************************************************************************


    // ************************************* post teacher Login ******************************************************************

    postTeacherLogin:(req,res)=>{
       
        teacherhelper.teacherLogin(req.body).then((result)=>{
            if(result.adminLoggedIn){
              console.log("i am admin");
              req.session.adminLoggedIn=true;
              req.session.user=result.user; 
              res.redirect('/admin');
            }else{
              console.log("i am inside else part");
            if(result.loggedIn){
              console.log("i am teacher");
                req.session.teacherLoggedIn=true;
                req.session.user=result.user ;
                res.redirect('/teacher');
            }else{
              if(result.passwordNotMatch){
                req.session.passwordNotMatch=true;
                res.redirect('/teacher-login');
              }
              if(result.noUser){
                req.session.noUser=true;
                res.redirect('/teacher-login');
              }
            }
                
            }
        })
    },
     

    //**********************************************************************************************************************  

    // *******************************************teacher Home Page ***************************************************

    teacherHomePage:(req,res)=>{
      teacherhelper.getCourseMark().then((result)=>{
        if(result){
          let course= result.map(e=>  e.course)
          let courseObjects = course.map(course => ({ course }));
          
          res.render('./teacher/teacher-index',{name:req.session.user.name,course})
        }
      })
      
        
    },

// *************************************************************************************************************************


    // ******************************************* Stuudent Attendence *************************************************************

    studentAttandance:(req,res)=>{
          details=req.body
          console.log(req.body);
          let  subject= details.subject,
          date1= new Date()
          date1= date1.toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' }).split(' ')[0];
      
      data={
        course:details.course,
        year:details.year,
      }
      data.sub=subject
      data[subject] =[{date:date1,absentees:details.name}]

      teacherhelper.studentAttandance(data).then(()=>{
        res.redirect('/attendence')

      })


    },

    // ***************************************************************************************************************************
    
    postStudentInternals:(req,res)=>{
      // console.log(req.body);
     
      teacherhelper.studentInternal(req.body).then((result)=>{
        res.redirect('/internal')
        })

    },
    getStudentid:(req,res)=>{
      // console.log(req.body);
      teacherhelper.getstudentid(req.body).then((result)=>{
        result = result.map(e =>e.collageid)
        // console.log(result);
        
        res.send(result)
        
      })
    },

    getSubject:(req,res)=>{
      teacherhelper.getSubject(req.body).then((result)=>{
        res.send(result)

      })
    },

    getMark:(req,res)=>{
      console.log("this is get mark in con");
      console.log(req.body);
      teacherhelper.getMark(req.body).then((result)=>{
        
        if(result){
          var result1 = Object.keys(result).map((key) => [key, result[key]]);
        }
       
        console.log(result1);

        res.send(result1)
      })
    },

    getCourseMark:(req,res)=>{
      teacherhelper.getCourseMark({nothing:'nothing'}).then((result)=>{
       console.log(result);
        if(result){
          let course= result.map(e=>  e.course)
       let   data= result.map(e => e.details)
       let courseObjects = course.map(course => ({ course }));


       for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          console.log(data[i][j].sem);
        }
      }

      // course = Object.assign(course:,course)
      //  details = details.map(e=>e.sem)
          // console.log(details);
      //  let sem = details.map(e=> e.sem)

       console.log(courseObjects);

       course= courseObjects
      //  console.log(sem);
       res.render('./teacher/student-internal',{course})

        }

       


      })
    }
    
}