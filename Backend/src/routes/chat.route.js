const ChatController = require("../controller/chat.controller");
const router = require("express").Router();
const upload = require("../utils/Owner.images");

// send message
router.post("/sendMessage", upload.single("media"), ChatController.sendMessage);

// get chat history
router.get("/getChatHistory", ChatController.getChatHistory);

// send Group message
router.post("/sendGroupMessage", ChatController.sendGroupMessage);

// get group chat history
router.get("/groupMessageHistory", ChatController.GroupMessageHistory);

module.exports = router;
