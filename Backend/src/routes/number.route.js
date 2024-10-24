const NumberController=require("../controller/importantNumber.controller")
const router=require("express").Router();
//create number 
router.post("/createnumber",NumberController.CreateNumber)
module.exports=router;