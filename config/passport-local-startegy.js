const User=require('../models/user');
const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy

//authentication using passport
passport.use(new LocalStrategy({
      usernameField: 'email',
      passReqToCallback: true
    },
    function(req,email,password,done){
        // to find user and establish identity
        User.findOne({email : email},function(err, user){
            if(err){
                req.flash('error',err)
                return done(err);
              // return res.redirect('back');
            }
            if(!user || user.password!== password){
                req.flash('error','Invalid username/password');
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

//check if user is authenticated
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');
}

passport.setAuthencticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;