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

let  studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    course:String,
    email:{
        type:String,
        required:true,
        lowercase:true

    },
    collageid:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        // required:true
    },
    address:addressSchema,
    createDate: {
        type:Date,
        default:new Date()
    },
    parentsNumber:Number,
    studentNumber:Number,
    sem:Number,
    internals:[]
    
    
    







})


module.exports= {
   student: mongoose.model('student',studentSchema)
}
