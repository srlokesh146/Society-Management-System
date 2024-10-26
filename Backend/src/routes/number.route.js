const NumberController=require("../controller/importantNumber.controller")
const router=require("express").Router();
//create number 
router.post("/createnumber",NumberController.CreateNumber)
router.get("/viewnumber",NumberController.GetAllNumber)
router.get("/:id",NumberController.GetById)
router.delete("/:id",NumberController.DeleteNumber)
router.patch("/:id",NumberController.UpdateNumber)
module.exports=router;