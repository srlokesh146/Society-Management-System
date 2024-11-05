const Protocol = require("../models/SecurityProtocol.model");
const cloudinary = require('../utils/cloudinary'); 
const fs=require("fs")
const crypto= require("crypto");
//create protocol
exports.CreateProtocol = async (req,res)=>{
   try {
     const {title,description}=req.body;
     if(!title || !description){
         return res.status(400).json({
             success:false,
             message:"All fields are required"
         })
     }
 
     const protocol= new Protocol({
         title,
         description,
     })
 
     await protocol.save();
 
     if(!protocol){
         return res.status(400).json({
             success:false,
             message:"Something went wrong"
         })
     }
 
     return res.status(200).json({
         success:true,
         message:"Protocol successfully Added"
     })
   } catch (error) {
    console.error(error);
    return res.status(500).json({
         success: false,
         message: "error in protocol creating"
     });
   }
}
//get protocol 
exports.GetAllProtocol=async (req,res)=>{
    try {
        const find=await Protocol.find().sort({ date:1 });
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            Protocol:find
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
             success: false,
             message: "error in protocol find"
         });
    }
}
//get By Id protocol
exports.GetByIdProtocol=async (req,res)=>{
    try {
        const find=await Protocol.findById(req.params.id).sort({ date:1 });
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            Protocol:find
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
             success: false,
             message: "error in protocol find"
         });
    }
}
//delete protocol
exports.DeleteProtocol=async (req,res)=>{
    try {
        const find=await Protocol.findByIdAndDelete(req.params.id);
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Protocol are deleted"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
             success: false,
             message: "error in protocol delete"
         });
    }
}
//update protocol
exports.UpdateProtocol =async (req,res)=>{
    try {
        const {title,description,date ,time}=req.body;
        if(!title || !description || !date || !time){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
    
        const protocol= await Protocol.findByIdAndUpdate(req.params.id,{
            title,
            description,
            date,
            time
        },{new:true})
    
        if(!protocol){
            return res.status(400).json({
                success:false,
                message:"Something went wrong"
            })
        }
    
        return res.status(200).json({
            success:true,
            message:"Protocol successfully updated"
        })
      } catch (error) {
       console.error(error);
       return res.status(500).json({
            success: false,
            message: "error in protocol updated"
        });
      }
}
// add security guard
exports.CreateSecurityGuard= async(req,res)=>{
    function generatePassword(length= 6){
        const password= crypto.randomInt(0, Math.pow(10,length)).toString();
        return password.padStart(length,"0")
  }
  const {
      Full_name,
      number,
      Email_address,
      Age,
      Gender,
      Wing,
      Unit,
      Relation,
      Member_Counting,
      Vehicle_Counting,
      role,
  } = req.body;
         const password=  generatePassword();
         console.log(password);

         const hashpassword= await hash(password)
}