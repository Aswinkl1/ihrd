var generator = require('generate-password');

module.exports={
    newPassword:()=>{
        return  password = generator.generate({
            length: 10,
            numbers: true

        });
    }
}
