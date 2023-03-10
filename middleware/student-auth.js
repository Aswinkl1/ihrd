module.exports={
    studentLoginAuthentication:(req,res,next)=>{
        if(req.session.studentLoggedIn){
            next()
        }else{
            res.redirect('/student-login')
        }
    }
}





