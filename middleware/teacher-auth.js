module.exports={
    teacherAuthentication:(req,res,next)=>{
        if (req.session.teacherLoggedIn) {
            next();
        } else {
            res.redirect('/teacher-login');
        }
       }
}