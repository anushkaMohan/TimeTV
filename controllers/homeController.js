//File used to handle various actions
module.exports.home= function(req,res){
  //  return res.end('<h1>Express is bopping popping!');
   return res.render('home',{
     title:'Home'
   });
}