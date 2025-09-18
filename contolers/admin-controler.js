var express = require('express');

var adminhelper = require('../db-helpers/admin-helpers')

module.exports={

// ********************* ***************Student Regester *****************************************************

studentRegister:(req,res)=>{
    
    adminhelper.addstudent(req.body).then((result)=>{
      if(result==0){
        
        res.render('./login/student-registration', {msg:'collageid already exists'})
      }else{
        
        res.render('./login/student-registration',{msg:'user added successfully'})
        // res.redirect('/admin/student-registered')
        
      }
      
      
    })
  },

  // *******************************************************************************************



// ***************************************** Teacher Regester *************************************************

  teacherRegister:(req,res)=>{
    console.log("i am inside contoller");
    adminhelper.addTeacher(req.body).then((result)=>{
        if(result==0){
        
            res.render('./login/teacher-registration', {msg:'Email already exists'})
          }else{
            
            // res.render('./login/student-registration',{msg:'user added successfully'})
            res.render('./login/teacher-registration', {msg:'Teacher added successfully'})
            
          }
    })
  },

// ****************************************************************************************************************************************


//**************************************************** Subject  ****************************************************************************


  getSubject:(req,res)=>{
    res.render('./admin/subject')
  },

  postSubject:(req,res)=>{
   
   let  details=req.body
    data={
      course:details.course
     }
    data.details =[{sem :details.sem ,subject:[details.subject]}]
    adminhelper.addSubject(data).then((result)=>{
     res.redirect('subject')
    })
  
  },
  // ***********************************************************************************************

  removeSubject:(req,res)=>{

    console.log(req.body);
    adminhelper.removeSubject(req.body).then((result)=>{
      res.redirect('subject')

    })
  },


  getmail:(req,res)=>{
    res.render('./admin/mail')
  },



  postmail:(req,res)=>{

  adminhelper.postmail(req.body)

  },


  getHomeEdit:(req,res)=>{

    res.render('./admin/home-form')
  },


  postHomeEdit:(req,res)=>{
    console.log("i am at home");
    let image = req.files.image
    let imageName = req.files.image.name
        console.log(image);

      adminhelper.homeEdit({imagename:imageName}).then((name)=>{
       
        let image = req.files.image
        console.log(image);
        
        image.mv('./public/images/home/'+name ,(err,done)=>{
          if(!err){

           console.log("no err");
           
           res.redirect('edit-home')
           
          }else{
            console.log(err);
          }
        })

      })
      
      
  
  },


  postcourseEdit:(req,res)=>{
    let imageName = req.files.image.name
    let data={
      name:req.body.name,
      description:req.body.Description,
      image:imageName
    }
   
    
      adminhelper.postEditCourse(data).then((name)=>{
        console.log(name);
        if(name!=0){
          let image = req.files.image
          image.mv('./public/images/home/'+name ,(err,done)=>{
            if(!err){
  
             console.log("no err");
             res.redirect('edit-home')
            }else{
              console.log(err);
            }
          })
        }else{
          // res.render(,{msg:'subject already exist'})
        }
        

      })

  
  },

  postFaciltyEdit:(req,res)=>{
    let imageName = req.files.image.name
    let data={
      name:req.body.name,
      description:req.body.Description,
      image:imageName
    }
   
    
      adminhelper.postEditFacilty(data).then((name)=>{
        console.log(name);
        if(name!=0){
          let image = req.files.image
          image.mv('./public/images/home/'+name ,(err,done)=>{
            if(!err){
  
             console.log("no err");
             res.redirect('edit-home')
            }else{
              console.log(err);
            }
          })
        }else{
          // res.render(,{msg:'subject already exist'})
        }
        

      })
  
  },


  postStaffEdit:(req,res)=>{

    let imageName = req.files.image.name
    let data={
      name:req.body.name,
      description:req.body.Description,
      image:imageName
    }
   
    
      adminhelper.postEditStaff(data).then((name)=>{
        console.log(name);
        if(name!=0){
          let image = req.files.image
          image.mv('./public/images/teacher-image/'+name ,(err,done)=>{
            if(!err){
  
             console.log("no err");
             res.redirect('edit-home')
            }else{
              console.log(err);
            }
          })
        }else{
          // res.render(,{msg:'subject already exist'})
        }
        

      })
  
  },

  postAluminiEdit:(req,res)=>{

    let imageName = req.files.image.name
    let data={
      name:req.body.name,
      description:req.body.Description,
      image:imageName
    }
   
    
      adminhelper.postEditAlumini(data).then((name)=>{
        console.log(name);
        if(name!=0){
          let image = req.files.image
          image.mv('./public/images/home/'+name ,(err,done)=>{
            if(!err){
  
             console.log("no err");
             res.redirect('edit-home')
            }else{
              console.log(err);
            }
          })
        }else{
          // res.render(,{msg:'subject already exist'})
        }
        

      })
  
  },

  getHomePage:(req,res)=>{
    adminhelper.getHomePage().then((result)=>{
      
      let course = result.course
      let staff = result.staf
      let aluminis = result.aluminis
      let home = result.home[0]
      let faciltities= result.faciltities
      console.log(home);
      res.render('./main/index',{course,staff,aluminis,home,faciltities});
    })
  }
}