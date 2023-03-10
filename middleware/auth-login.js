module.exports={
   teacherAdminAuthentication:(req,res,next)=>{
    if (req.session.teacherLoggedIn || req.session.adminLoggedIn) {
        next()
    } else {
        res.redirect('/teacher-login')
    }
   },


   loginSelectAuthentication:(req,res,next)=>{
    if (req.session.teacherLoggedIn) {
        res.render('./teacher/teacher-index',{name:req.session.user.name})
        
    }else if(req.session.studentLoggedIn){
        res.redirect('/student')
    }else if(req.session.adminLoggedIn){
        res.redirect('/admin')
    }
    else{
        res.render('./login/login-select')
    }
   }
}