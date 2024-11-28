const SocietyController=require("../controller/society.controller");
const { auth, IsAdmin } = require("../middleware/auth");
const router=require("express").Router();
router.post("/addSociety",auth,IsAdmin,SocietyController.CreateSociety)
router.get("/viewSociety",auth,SocietyController.GetSociety)
module.exports=router;