const nodemailer=require('../config/nodemailer');

exports.newComment= (comment)=>{
   let htmlString=require('../views/mailer/comments/new_comments.ejs')
    nodemailer.transporter.sendMail({
        from: 'shikhawow74@gmail.com',
        to: comment.user.email,
        subject: 'Comment Published!',
        html:htmlString
    }),(err,info)=>{
        if(err){
            console.log("Error in sending mail", err);
            return;
        }
        console.log('Message sent!',info);
        return;

    }
}