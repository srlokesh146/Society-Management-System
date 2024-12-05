const Question = require("../models/CommunityQuestion.model");

exports.createQuestion = async (req, res) => {
    try {
      const { question } = req.body;
  
      if (!question) {
        return res.status(400).json({
          success: false,
          message: "Question is required",
        });
      }
  
      const newQuestion = new Question({
        createdBy:req.user.id,
        question,
      });
  
      await newQuestion.save();
  
      return res.status(201).json({
        success: true,
        message: "Question created successfully",
        question: newQuestion,
      });
    } catch (error) {
      console.error("Error creating question:", error);
      return res.status(500).json({
        success: false,
        message: "Error creating question",
      });
    }
  };
  exports.addAnswer = async (req, res) => {
    try {
      const { questionId } = req.params; 
      const { answer } = req.body;
  
      if (!answer) {
        return res.status(400).json({
          success: false,
          message: "Answer is required",
        });
      }
  
      const question = await Question.findById(questionId);
  
      if (!question) {
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });
      }
  
     
      question.ans.push({ answer });
      await question.save();
  
      return res.status(200).json({
        success: true,
        message: "Answer added successfully",
        question,
      });
    } catch (error) {
      console.error("Error adding answer:", error);
      return res.status(500).json({
        success: false,
        message: "Error adding answer",
      });
    }
  };
exports.GetQuestion =async(req,res)=>{
  try {
    const question = await Question.find()
    return res.status(200).json({
      success: true,
      Question: question,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching Question",
    });
  }
}  
  