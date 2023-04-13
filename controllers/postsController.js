const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=async function(req,res){
    try{
    await Post.create({
        content: req.body.content,
        user:req.user._id
    });
    if(xhr.req){
        return res.status(200).json({
              data:{
                post:post
              },
              message: "Post created!"
        });

        req.flash('success','Post created')
        return res.redirect('back');
}
    }catch(err){
        if(err){req.flash('error',"Error in creating post!")};
          res.redirect('/');
    }
}

module.exports.destroy = async (req, res) => {
	try {
		let post = await Post.findById(req.params.id);

		
		if (post.user == req.user.id) {

			//Delete the Post
			post.remove();
			req.flash('success',"Post Deleted");

			await Comment.deleteMany({ post: req.params.id });
   
            if(req.xhr){
               return res.status(200).json({
                     data:{
                        post_id:req.params._id
                     },
                     message:"Post deleted!"
               })
            }
			
    return res.redirect("back");}}
    catch (err) {
        	req.flash('error','Error in deleting post!');
        	return res.redirect("back");
        }
}