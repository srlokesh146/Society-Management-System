const VisitorController= require("../controller/visitor.controller");
const { auth, IsSecurity } = require("../middleware/auth");
const router=require("express").Router()
//add visitor
router.post("/addvisitor",auth,IsSecurity,VisitorController.CreateVisitor)
//get visitor
router.get("/viewvisitor",auth,IsSecurity,VisitorController.GetAllVisitor)
module.exports=router;