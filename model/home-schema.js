const mongoose = require('mongoose')

let homeSchema = new mongoose.Schema({

    name:String,
    home:[],
    course:[],
    faciltities:[],
    events:[],
    staf:[],
    aluminis:[],
    
})


module.exports= {
    home: mongoose.model('home',homeSchema)
 }
 