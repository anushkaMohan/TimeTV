const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=function(req,res){
    Post.create({
        content: req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){console.log("Error in creating post!");return;}
        return res.redirect('back');
    });
}

// module.exports.destroy=function(req,res){
//     Post.findById(req.params.id),function(err,post){
        
//         if(post.user.id==req.user.id)
//         {
//             post.remove();
//             Comment.deleteMany({post: req.params.id},function(err)
//             {    
//                 return res.redirect('/');
//             });
//         }else{
//             console.log('Error');
//             return res.redirect('/');
//         }
//     })
// }
module.exports.destroy = async (req, res) => {
	try {
		let post = await Post.findById(req.params.id);

		
		if (post.user == req.user.id) {

			//Delete the Post
			post.remove();
			console.log("Post Deleted");

			await Comment.deleteMany({ post: req.params.id });

			
    return res.redirect("back");}}
    catch (err) {
        	
        	return res.redirect("back");
        }
}