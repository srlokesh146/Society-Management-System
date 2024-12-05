const QuestionController=require("../controller/CommunityQuestion.controller");
const { auth } = require("../middleware/auth");
const router=require("express").Router();
router.post("/createquestion",auth,QuestionController.createQuestion)
router.post("/questions/:questionId/answers",QuestionController.addAnswer)
router.get("/getanswer",QuestionController.GetQuestion)
module.exports=router;