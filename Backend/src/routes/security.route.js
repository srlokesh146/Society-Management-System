const SecurityController=require("../controller/security.controller")
const router=require("express").Router();
router.post("/addprotocol",SecurityController.CreateProtocol)
//get protocol
router.get("/getprotocol",SecurityController.GetAllProtocol)
//get by id protocol
router.get("/protocol/:id",SecurityController.GetByIdProtocol)
//delete protocol
router.delete("/protocol/:id",SecurityController.DeleteProtocol)
//update protocol
router.patch("/protocol/:id",SecurityController.UpdateProtocol)
module.exports=router;