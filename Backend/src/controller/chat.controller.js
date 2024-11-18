const Chat = require("../models/chat.schema");
exports.getChatHistory = async (req, res) => {
    try {
        const { senderId, receiverId } = req.query;

        if (!senderId || !receiverId) {
            return res.status(400).json({ success: false, message: "Sender and receiver IDs are required" });
        }

    
        const chatHistory = await Chat.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ timestamp: 1 }); 

        return res.status(200).json({
            success: true,
            data: chatHistory
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};