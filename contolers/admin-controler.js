var express = require('express');

var adminhelper = require('../db-helpers/admin-helpers')

module.exports={



studentRegister:(req,res)=>{
    
    adminhelper.addstudent(req.body).then((result)=>{
      if(result==0){
        
        res.render('./login/student-registration', {msg:'collageid already exists'})
      }else{
        
        res.render('./login/student-registration',{msg:'user added successfully'})
        // res.redirect('/admin/student-registered')
        
      }
      
      
    })
  },
  teacherRegister:(req,res)=>{
    console.log("i am inside contoller");
    adminhelper.addTeacher(req.body).then((result)=>{
        if(result==0){
        
            res.render('./login/teacher-registration', {msg:'Email already exists'})
          }else{
            
            // res.render('./login/student-registration',{msg:'user added successfully'})
            res.render('./login/teacher-registration', {msg:'Teacher added successfully'})
            
          }
    })
  }

}