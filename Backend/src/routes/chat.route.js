const ChatController = require("../controller/chat.controller");
const router = require("express").Router();
const upload = require("../utils/Owner.images");

// send message
router.post("/sendMessage", upload.single("media"), ChatController.sendMessage);

// get chat history
router.get("/getChatHistory", ChatController.getChatHistory);

module.exports = router;
