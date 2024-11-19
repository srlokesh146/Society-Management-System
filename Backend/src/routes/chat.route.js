const ChatController=require("../controller/chat.controller")
const router=require("express").Router();
router.get("/getChatHistory",ChatController.getChatHistory)
module.exports=router;