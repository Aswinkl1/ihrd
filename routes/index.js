const studentContols =require('../contolers/student-controles')
var express = require('express');
var router = express.Router();
const teachercontol = require('../contolers/teacher-controls')
const loginMiddleware = require('../middleware/auth-login')
const teachermiddleware = require('../middleware/teacher-auth')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./main/index');
});


// --------------------------------------------------------
// /        / student login
router.get('/student-login',studentContols.getStudentLogin)

router.post('/student-login',studentContols.postStudentLogin)

// -------------------------------------------------------------
router.get('/login-select',loginMiddleware.loginSelectAuthentication)

              // Teacher login 

router.get('/teacher-login',teachercontol.getTeacherLogin)

router.post('/teacher-login',teachercontol.postTeacherLogin)

// ----------------------------------------------------------
router.get('/destroy',(req,res)=>{
  req.session.destroy()
  res.redirect('./teacher-login')
})

router.get('/attendence',(req,res)=>{
  res.render('./teacher/student-attendence')
})

router.post('/attendence',teachercontol.studentAttandance)
router.get('/teacher',teachermiddleware.teacherAuthentication,teachercontol.teacherHomePage)
module.exports = router;
