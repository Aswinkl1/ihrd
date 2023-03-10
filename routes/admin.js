var express = require('express');
var router = express.Router();
var adminhelper = require('../db-helpers/admin-helpers')
const adminAuth = require('../middleware/admin-auth')
const adminControler = require('../contolers/admin-controler')
const loginAuth = require('../middleware/auth-login')

/* GET home page. */
 router.get('/',adminAuth.adminLoggedIn, function(req, res, next)  {
    res.render('./admin/admin-index');
  });

   router.get('/student-registered',loginAuth.teacherAdminAuthentication,(req,res)=>{
    res.render('./login/student-registration')
  })

  router.get('/teacher-registered',(req,res)=>{
    res.render('./login/teacher-registration')
  })
  


  router.post('/student-register',adminControler.studentRegister)

  router.post('/teacher-register',adminControler.teacherRegister)

 

module.exports = router;