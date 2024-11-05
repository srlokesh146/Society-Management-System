const FacilityController=require("../controller/facility.controller")
const router=require("express").Router();
router.post("/addfacility",FacilityController.CreateFacility)
router.get("/viewfacility",FacilityController.GetAllFacility)
router.get("/:id",FacilityController.GetByIdFacility)
router.delete("/:id",FacilityController.DeleteFacility)
router.patch("/:id",FacilityController.UpdateFacility)
module.exports=router;