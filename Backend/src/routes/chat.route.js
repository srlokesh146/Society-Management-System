const ChatController = require("../controller/chat.controller");
const router = require("express").Router();

// send message
router.post("/sendMessage", ChatController.sendMessage);

// get chat history
router.get("/getChatHistory", ChatController.getChatHistory);

module.exports = router;
