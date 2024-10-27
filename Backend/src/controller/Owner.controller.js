const Owner = require('../models/Owener.model'); // Ensure the correct model name is used
const cloudinary = require('../utils/cloudinary'); // Import your Cloudinary configuration

exports.addOwnerData = async (req, res) => {
    try {
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

        // Helper function to upload images to Cloudinary
        const uploadToCloudinary = async (file) => {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'owner_documents' // Folder name in Cloudinary
            });
            return result.secure_url; // Return URL of uploaded image
        };

        // Upload each image to Cloudinary
        const Adhar_front = req.files['Adhar_front'] ? await uploadToCloudinary(req.files['Adhar_front'][0]) : null;
        const Adhar_back = req.files['Adhar_back'] ? await uploadToCloudinary(req.files['Adhar_back'][0]) : null;
        const Address_proof = req.files['Address_proof'] ? await uploadToCloudinary(req.files['Address_proof'][0]) : null;
        const Rent_Agreement = req.files['Rent_Agreement'] ? await uploadToCloudinary(req.files['Rent_Agreement'][0]) : null;

        // Create a new owner document
        const newOwner = new Owner({
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
            Rent_Agreement
        });

        // Save the owner data to the database
        await newOwner.save();

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
        res.status(201).json({
            success: true,
            message: "Owner data added successfully",
            ownerId: newOwner._id
        });
    } catch (error) {
        console.error("Error adding owner data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add owner data"
        });
    }
};
