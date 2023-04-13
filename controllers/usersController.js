const User=require('../models/user');

module.exports.profile=async(req,res)=>{
    User.findById(req.params.id,async (err,user)=>{
        if(err){
            console.log("Error in finding user!");
            return res.redirect('back');
        }
        return res.render('user_profile',{
                    title : 'User Profile | TimeTV',
                    profile_user: user
                });
    });
}
module.exports.update=function(req,res){
    if(req.user.id == req.params.id){ 
    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
        return res.redirect('back');
    })
    }else{
        return res.status(401).send('unauthorised')
    }
}

module.exports.signUp=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up.ejs',{
        title: "TimeTV | SignUp"
    });
   
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    } 
   return res.render('user_sign_in.ejs',{
        title:"TimeTV | SignIn"
    })
}

//get signUp data
module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email :req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user in database!');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                console.log('Error in finding user in database!');
                 return;}
                 return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('/users/sign-in');
        }
    })

}

//get signIn data
module.exports.createSession=function(req,res){
        req.flash('success','Logged in successfully!')
        return res.redirect('/');
}
//for signing out
module.exports.destroySession=function(req,res,next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
    req.flash('success','You are logged out!')
    return res.redirect('/');
    });
}
//
