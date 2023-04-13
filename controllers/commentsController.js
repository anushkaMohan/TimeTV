const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=async (req,res)=>{
    try{
    let post=await Post.findById(req.body.post);
   
    //     console.log(req.body.post);
    //    console.log(req.body.content);
   // console.log(post);
        if(post){
           // console.log("fdihgui");
           let comment=await Comment.create({
                content:req.body.content,
                post:req.body.post,
                 user:req.user._id
            });
            //console.log(comment.content);
            post.comments.push(comment);
            post.save();
           // console.log("done");
           req.flash('success','Commented!')
            return res.redirect("back");
            }
            return res.redirect("back");
        }
    catch (err) {
        req.flash('error',"Error in creating comment");
        return res.redirect("back");
    }
}

module.exports.destroy=async(req,res)=>{
    let comment=Comment.findById(req.params.id);
    if(comment.user == req.params.id)
    {
        let postId=comment.post;
        comment.remove();

        Post.findByIdAndUpdate(postId, {$pull:{comments : req.params.id}}, function(err,post){
            req.flash('success','Comment deleted!')
            return res.redirect('back');
        })
    }
    else{
        req.flash('error','Comment not deleted!');
        return res.redirect('back');
    }
}