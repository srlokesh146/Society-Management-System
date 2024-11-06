const FinancialController=require("../controller/Financial.controller")
const router=require("express").Router();
//add notes
router.post("/addnote",FinancialController.CreateNote)
//get notes
router.get("/viewnote",FinancialController.GetAllNotes)
//get By Id Notes
router.get("/note/:id",FinancialController.GetByIdNotes)
//delete note
router.delete("/note/:id",FinancialController.DeleteNote)
//Update Note
router.patch("/note/:id",FinancialController.UpdateNote)
module.exports=router;