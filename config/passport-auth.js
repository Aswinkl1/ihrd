const Localstratagy = require('passport-local').Strategy
var db = require('../helpers/schema')
const bycrpt = require('bcrypt')

function initialize(passport){
    
 passport.use(new Localstratagy({usernameField:'collageid'},function verifyLogin(collageid,password,done){
    console.log("i am inside here"); 
    db.student.findOne({collageid:collageid},async(err,user)=>{
          console.log('i am inside findone');
        if(err) return done(err)
        if(!user) return done(null,false,{message:'no user with that collage id'})
        try{
            console.log("i am insiide try");
            if(await bycrpt.compare(password,user.password)){
                return done(null,user)
            }else{
                return done(null,false,{message:'incorrect password'})
            }

        }catch(e){
            done(e)

        }
    })

 }))

 passport.serializeUser((user,done)=>{ done(null,user.id)})
 passport.deserializeUser((id,done)=>{
    user.findById(id,(err,user)=>{
        done(err,user)
    })
})
}

module.exports=initialize