
const cloudinary = require('../utils/cloudinary'); 
const fs=require("fs")
const crypto= require("crypto");
const senData = require('../config/mail');
const { hash } = require('../utils/hashpassword');
const Tenante = require('../models/Tenent.model');
exports.addTenante = async (req, res) => {
    try {

        function generatePassword(length= 6){
              const password= crypto.randomInt(0, Math.pow(10,length)).toString();
              return password.padStart(length,"0")
        }
        const {
            Owner_Full_name,
            Owner_Phone,
            Owner_Address,
            Full_name,
            Phone_number,
            Email_address,
            Age,
            Gender,
            Wing,
            Unit,
            Relation,
            Member_Counting,
            Vehicle_Counting,
            role
            
        } = req.body;
               const password=  generatePassword();
               console.log(password);

               const hashpassword= await hash(password)
               
        
               const uploadAndDeleteLocal = async (fileArray) => {
                if (fileArray && fileArray[0]) {
                    const filePath = fileArray[0].path;
                    try {
                        // Upload to Cloudinary
                        const result = await cloudinary.uploader.upload(filePath);
                        // Delete from local server
                        fs.unlink(filePath, (err) => {
                            if (err) console.error("Error deleting file from server:", err);
                            else console.log("File deleted from server:", filePath);
                        });
                        return result.secure_url;
                    } catch (error) {
                        console.error("Error uploading to Cloudinary:", error);
                        throw error;
                    }
                }
                return '';
            };
    
            // Upload images to Cloudinary and delete local files
            const profileImage = await uploadAndDeleteLocal(req.files?.profileImage);
            const Adhar_front = await uploadAndDeleteLocal(req.files?.Adhar_front);
            const Adhar_back = await uploadAndDeleteLocal(req.files?.Adhar_back);
            const Address_proof = await uploadAndDeleteLocal(req.files?.Address_proof);
            const Rent_Agreement = await uploadAndDeleteLocal(req.files?.Rent_Agreement);

            if (
                !Owner_Full_name ||
                !Owner_Phone ||
                !Owner_Address ||
                !Full_name ||
                !Phone_number ||
                !Email_address ||
                !Age ||
                !Gender ||
                !Wing ||
                !Unit ||
                !Relation ||
                !Member_Counting ||
                !Vehicle_Counting ||
                !profileImage ||
                !Adhar_front ||
                !Adhar_back ||
                !Address_proof ||
                !Rent_Agreement 
              ) {
                return res.status(400).json({
                  success: false,
                  message: "All fields are required",
                });
              }
    
        // Create a new owner document
        const newOwner = new Tenante({
            Owner_Full_name,
            Owner_Phone,
            Owner_Address,
            profileImage,
            Full_name,
            Phone_number,  
            Email_address,
            Age,
            Gender,
            Wing,
            Unit,
            Relation,
            Adhar_front,
            Adhar_back,
            Address_proof,
            Rent_Agreement,
            role:role || "resident",
            password: hashpassword
            
        });

      
        await newOwner.save();
        

        await senData(
            newOwner.Email_address,
            "Tenante Registration Successful - Login Details",
            `Dear ${newOwner.Full_name},\n\nYou have successfully registered as a Tenante. Your login details are as follows:\n\nUsername: ${newOwner.Email_address}\nPassword: <b> ${password}</b>\n\nPlease keep this information secure.\n\nBest Regards,\nManagement`
        );
   
       

       
       
        // Handle Member Counting
        if (Member_Counting) {
            const members = JSON.parse(Member_Counting);
            await Tenante.updateOne(
                { _id: newOwner._id },
                { $push: { Member_Counting: { $each: members } } }
            );
        }

        // Handle Vehicle Counting
        if (Vehicle_Counting) {
            const vehicles = JSON.parse(Vehicle_Counting);
            await Tenante.updateOne(
                { _id: newOwner._id },
                { $push: { Vehicle_Counting: { $each: vehicles } } }
            );
        }

        // Send success response
       return res.status(201).json({
            success: true,
            message: "Tenante data added successfully",
            
        });
    } catch (error) {
        console.error("Error adding owner data:", error);
       return res.status(500).json({
            success: false,
            message: "Failed to add owner data"
        });
    }
};
exports.GetAllTenante= async(req,res)=>{
    try {
        // Fetch all owners sorted by Wing and Unit
        const owners = await Tenante.find().sort({ Wing: 1, Unit: 1 });

        if (!owners || owners.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No data found"
            });
        }

        
        const ownerCounts = owners.map(owner => ({
            profileImage:owner.profileImage,
            Full_name: owner.Full_name,
            Unit: owner.Unit,
            Wing: owner.Wing,
            Resident_status: owner.Resident_status,
            Phone_number: owner.Phone_number,
            Member_Counting_Total: owner.Member_Counting ? owner.Member_Counting.length : 0,
            Vehicle_Counting_Total: owner.Vehicle_Counting ? owner.Vehicle_Counting.length : 0
        }));

        // Respond with only the counts
        return res.json({
            success: true,
            Owner: ownerCounts
        });
    } catch (error) {
        console.error("Error fetching owner Tenante:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve Tenante data"
        });
    }
}


