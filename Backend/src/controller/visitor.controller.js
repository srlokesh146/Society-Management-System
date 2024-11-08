const Visitor = require("../models/SecurityVisitorsLogs.model");

//add visitor
exports.CreateVisitor= async (req,res)=>{
  try {
      const {name , number , date , wing, unit, time}=req.body
      if (
          !name ||
          !number ||
          !wing ||
          !unit 
        ) {
          return res.status(400).json({
            success: false,
            message: "All fields are required",
          });
        }
  
        const visitor= new Visitor({
          name,
          number,
          date,
          wing,
          unit, 
          time
        })
        await visitor.save()
        if(!visitor){
          return res.status(400).json({
              success: false,
              message: "Something went wrong",
          })
        }
  
        return res.status(400).json({
          success: false,
          message: "Visitor Successfully Added",
      })
  
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
        success: false,
        message: "Internal server error",
    })
  }
}
//get complaint
exports.GetAllVisitor = async (req, res) => {
    try {
      const visitor = await Visitor.find({})
        .sort({ wing: 1, unit: 1 }); 
  
      return res.status(200).json({
        success: true,
        data: visitor,
      });
    } catch (error) {
      console.error("Error fetching visitor:", error);
      return res.status(500).json({
        success: false,
        message: "Error fetching visitor",
      });
    }
  };

//filtering data