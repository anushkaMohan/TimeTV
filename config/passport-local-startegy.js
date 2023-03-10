const User=require('../models/user');
const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy

//authentication using passport
passport.use(new LocalStrategy({
      usernameField: 'email'
    },
    function(email,password,done){
        // to find user and establish identity
        User.findOne({email : email},function(err, user){
            if(err){
                console.log('Error in finding user!')
                return done(err);
            }
            if(!user || user.password!=password){
                console.log('Invalid username/password');
                return done(null,false);
            }
            return done(null,user);
        });
    }


));

//serialising cookies
passport.serializeUser(function(user,done){
    done(null,user.id)
});

//deserialising cookies
passport.deserializeUser(function(id,done){
      User.findById(id,function(err,user){
          if(err){
            console.log('Error in finding user!');
            return done(err);
          }
          return done(null,user);
      });
});

module.exports=passport;