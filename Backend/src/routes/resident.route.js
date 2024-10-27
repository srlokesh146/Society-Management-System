const ResidentController=require("../controller/Owner.controller")
const router=require("express").Router();
const upload=require("../utils/Owner.images")
router.post("/addowner", upload.fields([
    { name: 'Adhar_front', maxCount: 1 },
    { name: 'Adhar_back', maxCount: 1 },
    { name: 'Address_proof', maxCount: 1 },
    { name: 'Rent_Agreement', maxCount: 1 }
]), ResidentController.addOwnerData);
module.exports=router;