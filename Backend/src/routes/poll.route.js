const PollController=require("../controller/poll.controller");
const { auth } = require("../middleware/auth");
const router=require("express").Router();
router.post("/createpoll",auth,PollController.createPoll)
router.get("/getpoll",auth,PollController.getPolls)
module.exports=router;