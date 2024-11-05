
const Complaint = require("../models/complaint.model");


const getResidentId = (req) => {
    return req.user_Id; // Adjust this based on how you're storing user data in the request
}
exports.CreateComplaint= async(req,res)=>{
   try {
     const {complainer,name,description,wing,unit,priority,status}=req.body;
     if (
         !complainer ||
         !name ||
         !description ||
         !wing ||
         !unit ||
         !priority ||
         !status 
        
       ) {
         return res.status(400).json({
           success: false,
           message: "All fields are required",
         });
       }
       const residentId = getResidentId(req);
        const complaintadd= new Complaint({
           complainer,
           name,
           description,
           wing,
           unit,
           priority,
           status,
           resident:residentId
        })
        await complaintadd.save();

 
     return res.status(201).json({
         success: true,
         message: "Complaint Created successfully",
         
     });
   } catch (error) {
    console.error(error);
    return res.status(500).json({
         success: false,
         message: "Failed to add owner data"
     });
   }
}