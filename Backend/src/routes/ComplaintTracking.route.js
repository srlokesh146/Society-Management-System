const ComplaintTracking=require("../controller/Complaint.controller")
const router=require("express").Router();
//create complaint  
router.post("/addcomplaint",ComplaintTracking.CreateComplaint);
module.exports=router;