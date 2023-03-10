const mongoose = require('mongoose')
let addressSchema = new mongoose.Schema({
    housename:String,
    street:String,
    pincode:{
        type:Number,
        required:true
    },
    district:String,
    state:String
})


let teacherSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    phoneNumber:Number,
    address:addressSchema,
    password:{
        type:String,
        required:true
    },
    admin:Boolean
})

module.exports= {
    Teacher: mongoose.model('teacher',teacherSchema)
 }