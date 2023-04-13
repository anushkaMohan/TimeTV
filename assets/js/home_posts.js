{
    let newPostForm=$('#new-post-form');
     newPostForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/posts/create',
            data:newPostData.serialize,
            success:function(data){
                let newPost=newPostDOM(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button',newPost));
            },error: function(error){
                console.log(error.responseText);
            }
        });
     });
    }
    //method to create post and show in DOM
     let newPostDOM=function(post){
        return $(`
            <li id="post-${post._id}">
                    <p>
                            <small>
                                 <a class="delete-post-button" href="/posts/destroy/${post.id}">Delete</a>   
                               
                            </small>
                    </p>
                 
                    ${post.content}
                    <br>
                    <small>
                            ${ post.user.name}
                    </small>
                    <!-- for comments -->
                    <div class="post-comments">
                           
                               <form action="/comments/create" method="POST">
                                    <input type="text" name="content" placeholder="Type here to add comments">
                                    <input type="hidden" name="post" value="${post._id}">
                                    <input type="submit" value="Add Comment">
                               </form>
                           
        
                     <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                                  
                            </ul>
                    </div> 
                            </div>
            </li>`

        )
     }
    //method to delete
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error);
                }
            })
        })
    }