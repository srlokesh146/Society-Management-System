const Chat = require("../models/chat.schema");
const cloudinary = require('../utils/cloudinary');
const fs = require("fs")
// send Message
exports.sendMessage = async (req, res) => {
  try {
    const { userId, receiverId, message, senderModel, receiverModel} =
      req.body;

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

    const media = await uploadAndDeleteLocal(req.files?.media);
    // All fields are required
    if (!userId || !receiverId || !message || !media ) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    const newMessage = {
      senderId: userId,
      senderModel,
      receiverId,
      receiverModel,
      message,
      media
    };
    const createMessage = await Chat.create(newMessage);

    return res
      .status(200)
      .json({ message: "Message sent successfully!", data: createMessage });
  } catch (error) {
    
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Sender and receiver IDs are required",
      });
    }
    const chatHistory = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 });

    return res.status(200).json({
      success: true,
      data: chatHistory,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
