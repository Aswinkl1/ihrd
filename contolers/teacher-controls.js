var adminhelper = require('../db-helpers/admin-helpers')
const teacherhelper = require('../db-helpers/teacher-helpers')
var express = require('express');
var router = express.Router();


module.exports={


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

    teacherHomePage:(req,res)=>{
        res.render('./teacher/teacher-index',{name:req.session.user.name})
    },

    studentAttandance:(req,res)=>{
    details=req.body
    let  subject= details.subject,
      date1= new Date()
      
      data={
        
        course:details.course,
        year:details.year,
       

      }
      data.sub=subject
      data[subject] =[{date:date1,absentees:details.name}]

      teacherhelper.studentAttandance(data).then(()=>{
        res.redirect('/attendence')

      })


    }
    
    
}