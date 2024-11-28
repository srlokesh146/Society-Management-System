const Notification = require("../models/notification.schema");

exports.getAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id; 

   
    const notifications = await Notification.find({
      "users._id": userId,
    });

    
    const formattedNotifications = notifications.map((notification) => {
      return {
        ...notification._doc,
        users: notification.users.filter((user) => user._id.toString() === userId.toString()), 
      };
    });

    return res.status(200).json({
      success: true,
      notifications: formattedNotifications,
    });
  } catch (error) {
   
    return res.status(500).json({
      success: false,
      message: "Error fetching notifications",
    });
  }
  };
 exports.DeleteSingleNotification = async(req,res)=>{
  const { notificationId } = req.params; 
  const loggedInUserId = req.user._id; 

  try {
   
    const notification = await Notification.findOne({
      _id: notificationId,
      "users._id": loggedInUserId, 
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found or you are not authorized to delete it.",
      });
    }

    
    notification.users = notification.users.filter(
      (user) => user._id.toString() !== loggedInUserId.toString()
    );

    
    if (notification.users.length === 0) {
      await notification.remove();
      return res.status(200).json({
        success: true,
        message: "Notification deleted successfully.",
      });
    }

    
    await notification.save();

    return res.status(200).json({
      success: true,
      message: "Notification  successfully deleted",
    });
  } catch (error) {
   
    return res.status(500).json({
      success: false,
      message: "Error deleting notification.",
    });
  }
 }
 exports.DeleteAllNotification =async(req,res)=>{
  const loggedInUserId = req.user._id; 

  try {
   
    const notifications = await Notification.find({ "users._id": loggedInUserId });

    if (!notifications.length) {
      return res.status(404).json({
        success: false,
        message: "No notifications found for the logged-in user.",
      });
    }

  
    for (const notification of notifications) {
     
      notification.users = notification.users.filter(
        (user) => user._id.toString() !== loggedInUserId.toString()
      );

     
      if (notification.users.length === 0) {
        await notification.remove();
      } else {
       
        await notification.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: "All notifications  deleted.",
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "Error deleting notifications.",
    });
  }
 }