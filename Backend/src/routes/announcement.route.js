const announcementController=require("../controller/announcment.controller")
const { auth, IsAdmin } = require("../middleware/auth")
const router=require("express").Router()
router.post("/addannouncement",auth,IsAdmin,announcementController.CreateAnnouncement)
router.get("/viewannouncment",announcementController.GetAnnouncement)
router.get("/:id",announcementController.GetByIdAnnouncement)
router.delete("/:id",auth,IsAdmin,announcementController.DeleteAnnouncement)
router.patch("/:id",auth,IsAdmin,announcementController.UpdateAnnouncement)
//filter data
router.get("/an/getannouncment",announcementController.FilterAnnouncement)
module.exports=router;