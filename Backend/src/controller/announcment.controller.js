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
        
        return res.status(500).json({
             success: false,
             message: "error in Announcement fetching"
         });
    }

}
//filter announcement 
exports.FilterAnnouncement = async (req, res) => {
    try {
      const { timePeriod } = req.query;
      let dateFrom;
      const currentDate = new Date();
  
      switch (timePeriod) {
        case "lastWeek":
          dateFrom = new Date(currentDate.setDate(currentDate.getDate() - 7));
          break;
        case "lastMonth":
          dateFrom = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
          break;
        case "lastYear":
          dateFrom = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
          break;
        default:
          dateFrom = null; 
      }
  
     
      const filter = dateFrom ? { createdAt: { $gte: dateFrom } } : {};
  
      const announcements = await Announcement.find(filter);
  
      if (!announcements || announcements.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No announcements found",
        });
      }
  
      return res.status(200).json({
        success: true,
        data: announcements,
      });
    } catch (error) {
     
      return res.status(500).json({
        success: false,
        message: "Error fetching announcements",
      });
    }
  };
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
       
        return res.status(500).json({
             success: false,
             message: "error in Announcement updated"
         });
    }
}
