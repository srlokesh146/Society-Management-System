const ResidentController=require("../controller/Owner.controller")
const TenateController=require("../controller/Tenante.controller")
const router=require("express").Router();
const upload=require("../utils/Owner.images")
//add owner
router.post("/addowner", upload.fields([
    { name: 'Adhar_front', maxCount: 1 },
    { name: 'Adhar_back', maxCount: 1 },
    { name: 'Address_proof', maxCount: 1 },
    { name: 'Rent_Agreement', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
]), ResidentController.addOwnerData);
//show owner 
router.get("/viewowner",ResidentController.GetAllOwner)
//get by id resident
router.get("/owner/:id",ResidentController.GetByIdResident)
//delete by id  resident
router.delete("/owner/:id",ResidentController.DeleteByIdResident)

//add tenant
router.post("/addtenante",upload.fields([
    { name: 'Adhar_front', maxCount: 1 },
    { name: 'Adhar_back', maxCount: 1 },
    { name: 'Address_proof', maxCount: 1 },
    { name: 'Rent_Agreement', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
]), TenateController.addTenante)
//show tenante 
router.get("/viewtenante",TenateController.GetAllTenante)
// //get by id tenant
// router.get("/tenant/:id",ResidentController.GetByIdOwnerResident)



//======================
// get all resident
router.get("/allresident",ResidentController.GetAllResidents)
module.exports=router;