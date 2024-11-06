const announcementController=require("../controller/announcment.controller")
const router=require("express").Router()
router.post("/addannouncement",announcementController.CreateAnnouncement)
router.get("/viewannouncment",announcementController.GetAnnouncement)
router.get("/:id",announcementController.GetByIdAnnouncement)
router.delete("/:id",announcementController.DeleteAnnouncement)
router.patch("/:id",announcementController.UpdateAnnouncement)
module.exports=router;