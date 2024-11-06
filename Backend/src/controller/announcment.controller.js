const Announcement = require("../models/announcment.model");

//create announcement
exports.CreateAnnouncement= async (req,res)=>{
    try {
        const {title,description,date,time}=req.body;
        if(!title || !description){
            return res.status(400).json({
                success:true,
                message:"Fields are required"
            })
        }
        const announcement = new Announcement({
            title,
            description,
            date,
            time
        })
        await announcement.save();
    
        if(!announcement){
            return res.status(400).json({
                success:false,
                message:"Something went wrong"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Announcement Successfully Added"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
             success: false,
             message: "error in Announcement creation"
         });
    }
}
//get announcement
exports.GetAnnouncement = async(req,res)=>{
    try {
        const find= await Announcement.find();
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:false,
            Announcement:find
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
             success: false,
             message: "error in Announcement fetching"
         });
    }

}

//get by id 
exports.GetByIdAnnouncement= async(req,res)=>{
    try {
        const find= await Announcement.findById(req.params.id);
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:false,
            Announcement:find
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
             success: false,
             message: "error in Announcement fetching"
         });
    }
}
//delete announcement 
exports.DeleteAnnouncement= async(req,res)=>{
    try {
        const find= await Announcement.findByIdAndDelete(req.params.id);
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No data found"
            })
        }
        return res.status(200).json({
            success:false,
            message:"Announcement deleted Successfully.."
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
             success: false,
             message: "error in Announcement deleting"
         });
    }
}

//update announcement
exports.UpdateAnnouncement =async(req,res)=>{
    try {
        const {title,description,date,time}=req.body;
        if(!title || !description ){
            return res.status(400).json({
                success:true,
                message:"Fields are required"
            })
        }
        const announcement = await Announcement.findByIdAndUpdate(req.params.id,{
            title,description,date,time
        },{new:true})
    
        if(!announcement){
            return res.status(400).json({
                success:false,
                message:"Something went wrong"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Announcement Successfully updated"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
             success: false,
             message: "error in Announcement updated"
         });
    }
}
