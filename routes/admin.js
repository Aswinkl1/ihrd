var express = require('express');
var router = express.Router();
var adminhelper = require('../db-helpers/admin-helpers')
const adminAuth = require('../middleware/admin-auth')
const adminControler = require('../contolers/admin-controler')
const loginAuth = require('../middleware/auth-login')

/* GET home page. */
 router.get('/', adminAuth.adminLoggedIn,function(req, res, next)  {
  
    res.render('./admin/admin-index');
  });

   router.get('/student-registered',loginAuth.teacherAdminAuthentication,loginAuth.teacherAdminAuthentication,(req,res)=>{
    res.render('./login/student-registration')
  })


  router.get('/teacher-registered',loginAuth.teacherAdminAuthentication,(req,res)=>{
    res.render('./login/teacher-registration')
  })

  
// *********************** Teacher Regester ***************************

  router.post('/student-register',adminAuth.adminLoggedIn,adminControler.studentRegister)

  router.post('/teacher-register',adminAuth.adminLoggedIn,adminControler.teacherRegister)
  

  // ****************************************************************

  
  // **********************Add Subject *****************************
 router.get('/subject',adminControler.getSubject)



 router.post('/add-subject',adminAuth.adminLoggedIn,adminControler.postSubject)

 router.post('/remove-subject',adminAuth.adminLoggedIn,adminControler.removeSubject)

//  *******************************************************************

router.get('/mail',adminControler.getmail,adminAuth.adminLoggedIn)


router.post('/mail',adminControler.postmail)


router.get('/edit-home',adminControler.getHomeEdit,adminAuth.adminLoggedIn)


router.post('/home',adminControler.postHomeEdit,adminAuth.adminLoggedIn)


router.post('/course',adminControler.postcourseEdit,adminAuth.adminLoggedIn)


router.post('/facilty',adminControler.postFaciltyEdit,adminAuth.adminLoggedIn)


router.post('/staff',adminControler.postStaffEdit,adminAuth.adminLoggedIn)


router.post('/alumini',adminControler.postAluminiEdit,adminAuth.adminLoggedIn)




module.exports = router;