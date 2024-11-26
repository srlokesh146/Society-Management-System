const Chat = require("../models/chat.schema");

// send Message
module.exports.sendMessage = async (req, res) => {
  try {
    const { userId, receiverId, message, senderModel, receiverModel } =
      req.body;

    // All fields are required
    if (!userId || !receiverId || !message) {
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
    };

    console.log(newMessage);
    const createMessage = await Chat.create(newMessage);

    return res
      .status(200)
      .json({ message: "Message sent successfully!", data: createMessage });
  } catch (error) {
    console.log(error);
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
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
