const { Router } = require('express');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./main/index');
});

router.get('/student-login',(req,res)=>{

  res.render('./login/student-login',{as:'aswin'});
})
router.get('/teacher-login',(req,res)=>{

  res.render('./login/teacher-login',{as:'aswin'});
})




module.exports = router;
