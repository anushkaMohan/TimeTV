const { populate } = require('../models/post');
const Post=require('../models/post');
//File used to handle various actions
module.exports.home= function(req,res){
  //  return res.end('<h1>Express is bopping popping!');
  //  console.log(req.cookies)
  //  res.cookie('user_1',23);
   
  //  Post.find({},function(err,posts){
  //   return res.render('home',{
  //     title:'TimeTV | Home',
  //     posts : posts
  //   });
  //  })
   Post.find({}).populate('user')
   .populate({
    path: 'comments',
    populate:{
         path:'user'
    }
    })
   .exec(function(err,posts){
          return res.render('home',{
            title:'TimeTV | Home',
            posts : posts
          });
   })
}