
const express=require('express');
const port=8000;
const app=express();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const db=require('./config/mongoose');

const expressLayout=require('express-ejs-layouts');

app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayout);
//to extract style and script from sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//using body parser
app.use(bodyParser.urlencoded({extended: true}));
//to use router
app.use('/',require('./routes'));
//to use user router
//app.get('/sign-up',require('./routes/users'))
//app.get('/sign-in',require('./routes/users'))
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

