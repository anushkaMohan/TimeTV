//File used to handle various actions
module.exports.home= function(req,res){
  //  return res.end('<h1>Express is bopping popping!');
   console.log(req.cookies)
   res.cookie('user_1',23);
   return res.render('home',{
     title:'Home'
   });
}