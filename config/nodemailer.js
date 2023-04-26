const nodemailer=require('nodemailer');
const ejs=require('ejs');

let transporter= nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user:'',
        password: ''
    }
});

let renderTemplate=(data, relativepath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer',relativepath),
        data,
        function(err, template){
            if(err){console.log('Error in rendering template'); return;}
            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter: transporter,
    renderTemplate: renderTemplate
}
