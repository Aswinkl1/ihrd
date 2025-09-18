const mongoose = require('mongoose')

let subjectSchema = new mongoose.Schema({
    course:String,
    sem:Number,
    details:[]
})

module.exports= {
    subject: mongoose.model('subject',subjectSchema)
 }