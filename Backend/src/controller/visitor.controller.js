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
// exports.FilterVisitor = async (req, res) => {
//   try {
//     const { timePeriod } = req.query;

//     // Get the current date components
//     const currentDate = new Date();
//     let filter = {};

//     if (timePeriod === "lastWeek") {
//       const lastWeekDate = new Date();
//       lastWeekDate.setDate(currentDate.getDate() - 7);

//       filter = {
//         $or: [
//           {
//             year: lastWeekDate.getFullYear(),
//             month: lastWeekDate.getMonth() + 1,
//             day: { $gte: lastWeekDate.getDate() }
//           },
//           {
//             year: currentDate.getFullYear(),
//             month: currentDate.getMonth() + 1,
//             day: { $lte: currentDate.getDate() }
//           }
//         ]
//       };

//     } else if (timePeriod === "lastMonth") {
//       const lastMonthDate = new Date();
//       lastMonthDate.setMonth(currentDate.getMonth() - 1);

//       filter = {
//         $or: [
//           {
//             year: lastMonthDate.getFullYear(),
//             month: lastMonthDate.getMonth() + 1,
//             day: { $gte: 1 }
//           },
//           {
//             year: currentDate.getFullYear(),
//             month: currentDate.getMonth() + 1,
//             day: { $lte: currentDate.getDate() }
//           }
//         ]
//       };

//     } else if (timePeriod === "lastYear") {
//       filter = {
//         year: { $gte: currentDate.getFullYear() - 1 }
//       };
//     }

//     // Fetch visitors based on the filter
//     const visitors = await Visitor.find(filter).sort({ wing: 1, unit: 1 });

//     return res.status(200).json({
//       success: true,
//       data: visitors,
//     });
//   } catch (error) {
//     console.error("Error fetching visitors:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error fetching visitors",
//     });
//   }
// };
exports.FilterVisitor = async (req, res) => {
  try {
    const { timePeriod } = req.query;
    const currentDate = new Date();
    let dateFrom, dateTo;

    
    if (timePeriod === "lastWeek") {
      
      dateFrom = new Date(currentDate);
      dateFrom.setDate(currentDate.getDate() - 7);  
      dateTo = currentDate;  

    } else if (timePeriod === "lastMonth") {
     
      dateFrom = new Date(currentDate);
      dateFrom.setMonth(currentDate.getMonth() - 1);  
      dateTo = currentDate;  

    } else if (timePeriod === "lastYear") {
      
      dateFrom = new Date(currentDate);
      dateFrom.setFullYear(currentDate.getFullYear() - 1);  
      dateTo = currentDate;  

    } else {
      
      dateFrom = null;
      dateTo = null;
    }

    
    const filter = dateFrom && dateTo ? { date: { $gte: dateFrom, $lte: dateTo } } : {};

    
    const visitors = await Visitor.find(filter).sort({ wing: 1, unit: 1 });

   
    return res.status(200).json({
      success: true,
      data: visitors,
    });
  } catch (error) {
    console.error("Error fetching visitors:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching visitors",
    });
  }
};
