var express = require('express');
var router = express.Router();
var adminhelper = require('../helpers/admin-helpers')
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('./admin/admin-index');
  });

  router.get('/student-registered',(req,res)=>{
    res.render('./login/student-registration')
  })

  router.get('/teacher-registered',(req,res)=>{
    res.render('./login/teacher-registration')
  })
  
  router.post('/student-register',(req,res)=>{
    
    adminhelper.addstudent(req.body).then((result)=>{
      if(result==0){
        
        res.render('./login/student-registration', {msg:'collageid already exists'})
      }else{
        res.render('./login/student-registration')
      }
      
      
    })
  })

  router.post('/student-login',(req,res,next)=>{
    console.log("i am inside post");
    passport.Authenticator('local',{
      
      successRedirect:'/student-home',
      failureRedirect:'/student-login',
      failureflash:true,
      
    })

     
  })

module.exports = router;