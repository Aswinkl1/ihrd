const studentContols =require('../contolers/student-controles')
var express = require('express');
var router = express.Router();
const teachercontol = require('../contolers/teacher-controls')
const loginMiddleware = require('../middleware/auth-login')
const teachermiddleware = require('../middleware/teacher-auth')
const adminControler = require('../contolers/admin-controler');
const teacherAuth = require('../middleware/teacher-auth');

/* GET home page. */
router.get('/', adminControler.getHomePage);


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
},teacherAuth.teacherAuthentication)


router.post('/attendence',teachercontol.studentAttandance,loginMiddleware.teacherAdminAuthentication)


router.get('/teacher',teachermiddleware.teacherAuthentication,teachercontol.teacherHomePage)


router.get('/internal',teachercontol.getCourseMark,loginMiddleware.teacherAdminAuthentication)
router.post('/internal',teachercontol.postStudentInternals,loginMiddleware.teacherAdminAuthentication)

router.post('/getcollageid',teachercontol.getStudentid)

router.post('/getSubject',teachercontol.getSubject)

router.post('/getMark',teachercontol.getMark)



module.exports = router;

