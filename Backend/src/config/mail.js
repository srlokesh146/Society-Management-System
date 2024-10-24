const nodemailer=require("nodemailer")

const transPorter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"kotakh311@gmail.com",
        pass:"casv enss rkeh viaw",
    }
})


async function senData(to,subject,otp){
    const mailFormat={
        from:"kotakh311@gmail.com",
        to:to,
        subject:subject,
        html:`Your Forgot password Otp ${otp}`
    }
    await transPorter.sendMail(mailFormat, (err,info)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("send mail");
        }
    })
}
module.exports=senData