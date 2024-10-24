const ImportantNumber = require("../models/importNumber.model");

//create important number 
exports.CreateNumber=async(req,res)=>{
   try {
     const {Full_name , Phone_Number , Work} =req.body;
     if(!Full_name || !Phone_Number || !Work){
         return res.status(400).json({
             success:false,
             message:"All fields Are required"
         })
     }
     const phoneRegex = /^\+91[6-9]\d{10}$/;
     if (!phoneRegex.test(Phone_Number)) {
         return {
             success: true,
             message: "Invalid phone number format"
         };
     } 
     const numbersave= new ImportantNumber({
         Full_name,
         Phone_Number,
         Work
     })
     await numbersave.save();
 
     if(!numbersave){
         return res.status(400).json({
             success:true,
             message:"Something went Wrong"
         })
     }
     return res.status(200).json({
         success:true,
         message:"Important Number Created"
     })
 
   } catch (error) {
    console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
   }
}