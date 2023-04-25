const { populate } = require('../models/post');
const Post=require('../models/post');
const User=require('../models/user');
//File used to handle various actions
module.exports.home=async function(req,res){
   try{
    let posts=await Post.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
    path: 'comments',
    populate:{
         path:'user'
    }
    })
   .exec(function(err,posts){
        //to find all users
       User.find({},function(err,users){
        return res.render('home',{
          title:'TimeTV | Home',
          posts : posts,
          all_users: users
       });
    
          
          });
   })
}catch(err){
   console.log('Error is displaying!');
   return res.redirect('/');
}
}