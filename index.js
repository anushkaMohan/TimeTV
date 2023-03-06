const express=require('express');
const port=8000;
const app=express();
const expressLayout=require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expressLayout);
//to use router
app.get('/',require('./routes/index'));

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
      if(err){
        console.log(`Error occured : ${err}`);
        return;
      }
      console.log(`Server is up and running on port : ${port}`);
})

