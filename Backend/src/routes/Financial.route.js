const FinancialController=require("../controller/Financial.controller");
const { auth } = require("../middleware/auth");
const upload=require("../utils/Owner.images")
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
//add expense
router.post("/addexpense", upload.fields([
    { name: 'bill', maxCount: 1 },
]), FinancialController.CreateExpense);
//get expense
router.get("/viewexpense",FinancialController.GetAllExpense)
//get by id 
router.get("/expense/:id",FinancialController.GetByIdExpense)
//total amount expense
router.get("/ex/expense/total-amount", FinancialController.getTotalExpenseAmount);
//delete expens
router.delete("/expense/:id",FinancialController.DeleteExpens)
//update expens
router.patch("/expense/:id", upload.fields([
    { name: 'bill', maxCount: 1 },
]), FinancialController.UpdateExpense);

//check password correction in maintenance
router.post("/checkpassword",auth,FinancialController.CheckMaintenancePassword)

//add maintenance 
router.post("/addmaintenance",FinancialController.CreateMaintenance)
//get maintenance
router.get("/viewmaintenance",FinancialController.GetMaintenance)
//update and get payment
router.put('/maintenance/:maintenanceId/resident/payment', auth,FinancialController.updatePaymentMode);
//FindByIdUserAndMaintance
router.get("/getuserandMaintance",auth,FinancialController.FindByIdUserAndMaintance)
//apply penlty 
router.post("/applypenlty", FinancialController.applyPenalty);
//get done maintannace
router.get("/donemaintannace",FinancialController.GetMaintananceDone)
//add income
router.post("/addincome",FinancialController.CreateIncome)
//get income
router.get("/viewincome",FinancialController.GetIncome)
//get by id income
router.get("/income/:id",FinancialController.GetByIdIncome)
//update and get payment
router.put('/income/:incomeId/resident/payment', auth,FinancialController.updatePaymentModeIncome);
//delete income
router.delete("/income/:id",FinancialController.DeleteIncome)
//update income
router.patch("/income/:id",FinancialController.UpdateIncome)
//get done income
router.get("/doneincome",FinancialController.GetIncomeDone)
//get done income total 
router.get("/i/income/total-done", FinancialController.GetTotalIncomeDone);
//FindByIdUserAndMaintance
router.get("/getuserandIncome",auth,FinancialController.FindByIdUserAndIncome)
module.exports=router;