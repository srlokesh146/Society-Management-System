const jwt=require("jsonwebtoken");
const constant = require("../config/constant");
exports.generateToeken = (userId,res)=>{
    const token= jwt.sign({
        userId,
        
    },
    constant.JWT_SECRET,
    {expiresIn:"15d"})

    res.cookie("society-auth",token,{
        maxAge:15*24*60*60*1000, 
        httpOnly:true,
        sameSite:"strict",
        secure:constant.NODE_ENV !== "development"
    })
    return token;
}