const NotificationController=require("../controller/notification.controller");
const { auth } = require("../middleware/auth");
const router=require("express").Router();
router.get("/notifications",auth,NotificationController.getNotifications)
module.exports=router;