
const express=require('express');
const port=8000;
const app=express();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const db=require('./config/mongoose');
const session=require('express-session')
const passport=require('passport');
const passportLocal=require('./config/passport-local-startegy');
const expressLayout=require('express-ejs-layouts');
const MongoStore=require('connect-mongo');

app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayout);
//to extract style and script from sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//using body parser
app.use(bodyParser.urlencoded({extended: true}));

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    dbName:'TimeTV',
    secret:'something',
    saveUninitialized:false,
    resave: false,
    ttl:{
      maxAge :(1000*60*100)
    },
    store:  MongoStore.create(
      {
       mongoUrl:'mongodb://127.0.0.1/TIMETV_development',
       autoRemove: 'disabled'
      
    },
    function(err){
      console.log(err || 'connected to mongo-express')
    }
    )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthencticatedUser);

//to use router
app.use('/',require('./routes'));

app.listen(port,function(err){
      if(err){
        console.log(`Error occured : ${err}`);
        return;
      }
      console.log(`Server is up and running on port : ${port}`);
})

