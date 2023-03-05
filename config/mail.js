const nodemailer = require("nodemailer");


module.exports={
    email:(details)=>{
        console.log(details);
        try{

        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
              user: 'caskuz04@gmail.com', 
              pass: 'bxdvdpzhmswnryic', 
            },
          })

         

          transporter.sendMail(details)

        }catch(e){
            console.log(e);
        }
    }
    
}
    
   