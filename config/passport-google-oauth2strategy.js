const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const { access } = require('fs');


passport.use(new googleStrategy({
      clientID:"618519733734-3tseq84a8337lraj51cs4mtllsgb36m3.apps.googleusercontent.com",
      clientSecret:"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",
      callbackURL:"http://localhost:8000/users/auth/google/callback"
},
   function(accessToken,refreshToken,profile,done){
      User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log(err);
            return;
        }
        console.log(accessToken,refreshToken);
        console.log(profile);

        if(user){
            return done(null,user);
        }else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                     console.log("Error in creating users!"); return;
                }
                return done(null,user);
            });
        }
      });
   }

));

module.exports=passport;