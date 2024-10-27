const Owner = require('../models/Owener.model'); 
const cloudinary = require('../utils/cloudinary'); 
const fs=require("fs")
const crypto= require("crypto");
const senData = require('../config/mail');
exports.addOwnerData = async (req, res) => {
    try {

        function generatePassword(length= 6){
              const password= crypto.randomInt(0, Math.pow(10,length)).toString();
              return password.padStart(length,"0")
        }
        const {
            Full_name,
            Phone_number,
            Email_address,
            Age,
            Gender,
            Wing,
            Unit,
            Relation,
            Member_Counting,
            Vehicle_Counting
        } = req.body;
               const password=  generatePassword();
               console.log(password);
               
        // Helper function to upload images to Cloudinary
        let result =  uploadImageToCloudinary = async (file) => {
             result = await cloudinary.uploader.upload(file, {
                folder: 'owner_documents' 
            });
            return result.secure_url; 
        };
        
        // Upload each image to Cloudinary
        const Owner_image = req.files.Owner_image ? await uploadImageToCloudinary(req.files.Owner_image[0].path) : null;
        const Adhar_front = req.files.Adhar_front ? await uploadImageToCloudinary(req.files.Adhar_front[0].path) : null;
        const Adhar_back = req.files.Adhar_back ? await uploadImageToCloudinary(req.files.Adhar_back[0].path) : null;
        const Address_proof = req.files.Address_proof ? await uploadImageToCloudinary(req.files.Address_proof[0].path) : null;
        const Rent_Agreement = req.files.Rent_Agreement ? await uploadImageToCloudinary(req.files.Rent_Agreement[0].path) : null;

        // Create a new owner document
        const newOwner = new Owner({
            Owner_image:result.secure_url,
            Full_name,
            Phone_number,
            Email_address,
            Age,
            Gender,
            Wing,
            Unit,
            Relation,
            Adhar_front:result.secure_url,
            Adhar_back:result.secure_url,
            Address_proof:result.secure_url,
            Rent_Agreement:result.secure_url,
            cloudinary_id: result.public_id,
            
        });

      
        await newOwner.save();
        

        await senData(
            newOwner.Email_address,
            "Registration Successful - Login Details",
            `Dear ${newOwner.Full_name},\n\nYou have successfully registered as a resident. Your login details are as follows:\n\nUsername: ${newOwner.Email_address}\nPassword: <b> ${password}</b>\n\nPlease keep this information secure.\n\nBest Regards,\nManagement`
        );
      

        [req.files.Adhar_front, req.files.Adhar_back, req.files.Address_proof, req.files.Rent_Agreement].forEach(fileArray => {
            if (fileArray) {
                fs.unlink(fileArray[0].path, (err) => {
                    if (err) {
                        console.log("Error deleting file:", err);
                    } else {
                        console.log("File deleted from server.");
                    }
                });
            }
        });

        // Handle Member Counting
        if (Member_Counting) {
            const members = JSON.parse(Member_Counting);
            await Owner.updateOne(
                { _id: newOwner._id },
                { $push: { Member_Counting: { $each: members } } }
            );
        }

        // Handle Vehicle Counting
        if (Vehicle_Counting) {
            const vehicles = JSON.parse(Vehicle_Counting);
            await Owner.updateOne(
                { _id: newOwner._id },
                { $push: { Vehicle_Counting: { $each: vehicles } } }
            );
        }

        // Send success response
       return res.status(201).json({
            success: true,
            message: "Owner data added successfully",
            
        });
    } catch (error) {
        console.error("Error adding owner data:", error);
       return res.status(500).json({
            success: false,
            message: "Failed to add owner data"
        });
    }
};
exports.GetAllOwner= async(req,res)=>{
    try {
        const find= await Owner.find();
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.json({
            success:true,
            Owner:find
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
             success: false,
             message: "Failed to add owner data"
         });
    }
}
exports.OnlyViewImage =async(req,res)=>{
    
}