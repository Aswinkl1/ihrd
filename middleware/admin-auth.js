module.exports={
    adminLoggedIn:(req,res,next)=>{
        if(req.session.adminLoggedIn){
            next()
        }else{
            res.redirect('/teacher-login')
        }
    }
}