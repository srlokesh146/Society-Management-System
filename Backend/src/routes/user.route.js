const UserController=require("../controller/user.controller")
const router=require("express").Router();
router.post("/signup",UserController.signup)
router.post("/login",UserController.login)
router.post("/logout",UserController.logout)
router.post("/sendotp",UserController.SendOtp)
router.post("/verifyotp",UserController.verifyOtp)
//reset password
router.post("/:id/reset",UserController.ResetPassword)
///update profile
router.patch("/:id",UserController.UpdateProfile)
router.get("/:id",UserController.FindByIdProfile)
module.exports=router;