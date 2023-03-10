var express = require('express');
const studentContols =require('../contolers/student-controles')
var router = express.Router();

const authentication = require('../middleware/student-auth')

// student homepage 
router.get('/',authentication.studentLoginAuthentication, studentContols.teacherHomePage);



module.exports = router;
