const studentHelper = require('../db-helpers/student-helpers')

var express = require('express');
var router = express.Router();
module.exports={

getStudentLogin:(req,res)=>{
    if (req.session.studentLoggedIn) {
        res.redirect('/student')
      }
      else {
        
        if (req.session.passwordNotMatch) {
          let passwordNotMatch = req.session.passwordNotMatch
          req.session.passwordNotMatch=false
          
          res.render('./login/student-login',{passwordNotMatch,noUser:false})            
        }
       
        else if (req.session.noUser) {
          let noUser = req.session.noUser
          req.session.noUser=false
          res.render('./login/student-login',{passwordNotMatch:false,noUser})
        }
        else{
          res.render('./login/student-login',{passwordNotMatch:false,noUser:false})
        }
      
        
      }


},
postStudentLogin:(req,res)=>{

    studentHelper.studentLogin(req.body).then((result)=>{
            
        if(result.loggedIn){
            req.session.studentLoggedIn=true
            req.session.user=result.user
            res.redirect('/student')
        }else{
          if(result.passwordNotMatch){
            req.session.passwordNotMatch=true
            res.redirect('/student-login')
          }
          if(result.noUser){
            req.session.noUser=true
            res.redirect('/student-login')
          }
            
        }
    })
},
    teacherHomePage:(req,res)=>{
        res.render('./student/student-index',{name:req.session.user.name})
    }


}