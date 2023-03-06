const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1/TIMETV_development')

const db=mongoose.connection;

db.on("Error",console.error.bind(console,"Error in connecting to MongoDB"));

db.once('open',function(){
    console.log("Connected to MongoDB")
});


module.exports=db;