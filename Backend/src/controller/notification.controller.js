const Notification = require("../models/notification.schema");

exports.getAllNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find()
        .populate({
          path: 'users._id',  
          select: 'Full_name Unit Wing FirstName LastName', 
          model: function(doc) { return doc.model; } 
        });
  
      
      const formattedNotifications = notifications.map(notification => {
        const formattedUsers = notification.users.map(user => {
          if (user.model === 'Owner' || user.model === 'Tenante') {
            return {
              ...user,
              name: user._id.Full_name || 'Unknown User',
              unit: user._id.Unit || 'unknown unit',
              wing: user._id.Wing || 'unknown wing'
            };
          } else if (user.model === 'User') {
            return {
              ...user,
              name: `${user._id.FirstName} ${user._id.LastName}` || 'Admin User',
              unit: 'Admin Unit',
              wing: 'Admin Wing'
            };
          }
          return user;
        });
  
        return {
          ...notification._doc,
          users: formattedUsers
        };
      });
  
      return res.status(200).json({
        success: true,
        notifications: formattedNotifications
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching notifications",
      });
    }
  };
  exports.getNotifications = async (req, res) => {
    const { notificationId, startDate, endDate } = req.query; // Optional query params for filtering
  
    try {
      // Build query conditions
      let query = {};
  
      // Filter by notification ID if provided
      if (notificationId) {
        query._id = notificationId;  // Match by ObjectId
      }
  
      // Filter by date range if startDate and endDate are provided
      if (startDate && endDate) {
        query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) }; // Date range
      }
  
      // Find notifications based on the constructed query
      const notifications = await Notification.find(query)
        .populate('users._id') // This will populate the referenced models in `users._id`
        .exec();
  
      // Return the notifications in the response
      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching notifications",
      });
    }
  };
  
  