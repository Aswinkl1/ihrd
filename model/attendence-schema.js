const mongoose = require('mongoose')

let studentAttendence = new mongoose.Schema({
    course:String,
    year:Number,
    
},{strict:false})

module.exports= {
    attendence: mongoose.model('attendence',studentAttendence)
 }