
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017. 

 module.exports.connection= async function () {
 try{
  await mongoose.connect('mongodb://localhost:27017/collage');
  console.log("Database connected");
  

 }

 
 catch(err){
  console.log(err)
  console.log("Datatbase not connected")
 }
  
 } 








