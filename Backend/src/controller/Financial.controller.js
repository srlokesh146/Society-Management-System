const Expense = require("../models/Expense.model");
const Note = require("../models/Note.model");
const User = require("../models/user.schema");
const cloudinary = require('../utils/cloudinary');
const fs=require("fs");
const { compare } = require("../utils/compare");
const Maintenance = require("../models/maintenance.model");
const Income = require("../models/Income.model");
//create note
exports.CreateNote= async(req,res)=>{
   try {
     const {title,description,date}=req.body;
     if(!title || !description){
         return res.status(400).json({
             success:false,
             message:"All Fields Are Required"
         })
     }
 
     const notes=new Note({
         title,
         description,
         date
     })
     await notes.save();
     if(!notes){
         return res.status(400).json({
             success:false,
             message:"Something went wrong"
         })
     }
     return res.status(200).json({
         success:true,
         message:"Notes Added Successfully"
     })
   } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
   }
}
//get Note
exports.GetAllNotes= async(req,res)=>{
    try {
        const find = await Note.find()
        if (!find) {
            return res.status(400).json({
                success: false,
                message: "No data found"
            })
        }
        return res.status(200).json({
            success: true,
            Note: find
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "error in Note find"
        });
    }
}
//get Note
exports.GetByIdNotes= async(req,res)=>{
    try {
        const find = await Note.findById(req.params.id)
        if (!find) {
            return res.status(400).json({
                success: false,
                message: "No data found"
            })
        }
        return res.status(200).json({
            success: true,
            Note: find
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "error in Note find"
        });
    }
}
//delete note
exports.DeleteNote= async(req,res)=>{
    try {
        const find = await Note.findByIdAndDelete(req.params.id)
        if (!find) {
            return res.status(400).json({
                success: false,
                message: "No data found"
            })
        }
        return res.status(200).json({
            success: true,
            message:"Note Delete Successfully"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "error in Note find"
        });
    }
}
//update note
exports.UpdateNote =async(req,res)=>{
    try {
        const {title,description,date}=req.body;
        if(!title || !description){
            return res.status(400).json({
                success:false,
                message:"All Fields Are Required"
            })
        }
    
        const notes=await Note.findByIdAndUpdate(req.params.id,{
            title,description,date
        },{new:true})
        if(!notes){
            return res.status(400).json({
                success:false,
                message:"Something went wrong"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Notes Updated Successfully"
        })
      } catch (error) {
       console.log(error);
       res.status(500).json({
         success: false,
         message: "Internal Server error",
       });
      }
}
//add exppense 
exports.CreateExpense = async(req,res)=>{
    try {
        const {title,description,date,amount}=req.body;
        const uploadAndDeleteLocal = async (fileArray) => {
            if (fileArray && fileArray[0]) {
                const filePath = fileArray[0].path;
                try {
                    // Upload to Cloudinary
                    const result = await cloudinary.uploader.upload(filePath);
                    // Delete from local server
                    fs.unlink(filePath, (err) => {
                        if (err) console.error("Error deleting file from server:", err);
                        else console.log("File deleted from server:", filePath);
                    });
                    return result.secure_url;
                } catch (error) {
                    console.error("Error uploading to Cloudinary:", error);
                    throw error;
                }
            }
            return '';
        };
    
        // Upload images to Cloudinary and delete local files
        const bill = await uploadAndDeleteLocal(req.files?.bill);
        if (
            !title ||
            !description ||
            !date ||
            !amount ||
            !bill 
            
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
    
        const expens=new Expense({
            title,
            description,
            date,
            amount,
            bill
        })
        await expens.save();
    
         if(!expens){
            res.status(400).json({
                success:false,
                message:"Something went wrong"
            })
         }
        return res.status(200).json({
            success:true,
            message:"Expense successfully created"
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Internal Server error",
        });
    }
}
//get all expens
exports.GetAllExpense= async (req,res)=>{
    try {
        const complaints = await Expense.find()
        return res.status(200).json({
          success: true,
          Expense: complaints,
        });
      } catch (error) {
        console.error("Error fetching expense:", error);
        return res.status(500).json({
          success: false,
          message: "Error fetching expense",
        });
      }
}
//get by id expens
exports.GetByIdExpense= async (req,res)=>{
    try {
        const complaints = await Expense.findById(req.params.id)
        return res.status(200).json({
          success: true,
          Expense: complaints,
        });
      } catch (error) {
        console.error("Error fetching expense:", error);
        return res.status(500).json({
          success: false,
          message: "Error fetching expense",
        });
      }
}
//delete expens
exports.DeleteExpens= async (req,res)=>{
    try {
        const complaints = await Expense.findByIdAndDelete(req.params.id)
        return res.status(200).json({
          success: true,
          message:"Expense Deleted"
        });
      } catch (error) {
        console.error("Error fetching expense:", error);
        return res.status(500).json({
          success: false,
          message: "Error fetching expense",
        });
      }
}
exports.UpdateExpense = async (req, res) => {
    try {
        const { id } = req.params; 
        const { title, description, date, amount } = req.body;

        // Find the expense by ID
        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        
        const uploadAndDeleteLocal = async (fileArray) => {
            if (fileArray && fileArray[0]) {
                const filePath = fileArray[0].path;
                try {
                    // Upload to Cloudinary
                    const result = await cloudinary.uploader.upload(filePath);
                    // Delete from local server
                    fs.unlink(filePath, (err) => {
                        if (err) console.error("Error deleting file from server:", err);
                        else console.log("File deleted from server:", filePath);
                    });
                    return result.secure_url;
                } catch (error) {
                    console.error("Error uploading to Cloudinary:", error);
                    throw error;
                }
            }
            return '';
        };

        
        let bill = expense.bill; 
        if (req.files?.bill) {
            bill = await uploadAndDeleteLocal(req.files.bill);
        }

       
        expense.title = title || expense.title;
        expense.description = description || expense.description;
        expense.date = date || expense.date;
        expense.amount = amount || expense.amount;
        expense.bill = bill;

        await expense.save();

        return res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: expense,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
//check password correction in maintenance
exports.CheckMaintenancePassword = async (req, res) => {
    try {
       
        const { password } = req.body;

        
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        
        const isPasswordCorrect = await compare(password, req.user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password verified successfully"
        });

    } catch (error) {
        console.error("Error during password verification:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
//add maintenance
exports.CreateMaintenance= async (req,res)=>{
    try {
        const {maintenanceAmount,penaltyAmount,dueDate,penaltyDay}=req.body;
        if(!maintenanceAmount || !penaltyAmount || !dueDate || !penaltyDay){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const maintenance= new Maintenance({
            maintenanceAmount,
            penaltyAmount,
            dueDate,
            penaltyDay
        })
        await maintenance.save();
        
        if(!maintenance){
            return res.status(400).json({
                success:false,
                message:"Soemthing went wrong"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Maintenance Successfully Added"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}
//get maintenance
exports.GetMaintenance =async (req,res)=>{
    try {
        const  maintenance= await Maintenance.find()
        return res.status(200).json({
          success: true,
          Maintenance: maintenance,
        });
      } catch (error) {
        console.error("Error fetching Maintenance:", error);
        return res.status(500).json({
          success: false,
          message: "Error fetching Maintenance",
        });
      }
}
//add income
exports.CreateIncome= async(req,res)=>{
    try {
        const {title,date,dueDate,description,amount,member}=req.body;
        if(!title || !date || !dueDate || !description || !amount){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
    
        const income=new Income({
            title,
            date,
            dueDate,
            description,
            amount,
            member 
        })
        await income.save();
        if(!income){
            return res.status(400).json({
                success:false,
                message:"Soemthing went wrong"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Income Successfully Added"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
//get income
exports.GetIncome =async (req,res)=>{
    try {
        const  income= await Income.find()
        return res.status(200).json({
          success: true,
          Income: income,
        });
      } catch (error) {
        console.error("Error fetching Income:", error);
        return res.status(500).json({
          success: false,
          message: "Error fetching Income",
        });
      }
}
//get by id income
exports.GetByIdIncome =async (req,res)=>{
    try {
        const  income= await Income.findById(req.params.id)
        return res.status(200).json({
          success: true,
          Income: income,
        });
      } catch (error) {
        console.error("Error fetching Income:", error);
        return res.status(500).json({
          success: false,
          message: "Error fetching Income",
        });
      }
}
//delete income
exports.DeleteIncome =async (req,res)=>{
    try {
        const  income= await Income.findByIdAndDelete(req.params.id)
        return res.status(200).json({
          success: true,
          message:"Income deleted"
        });
      } catch (error) {
        console.error("Error fetching Income:", error);
        return res.status(500).json({
          success: false,
          message: "Error fetching Income",
        });
      }
}
//update income
exports.UpdateIncome= async(req,res)=>{
    try {
        const {title,date,dueDate,description,amount,member}=req.body;
        if(!title || !date || !dueDate || !description || !amount){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
    
        const income=await Income.findByIdAndUpdate(req.params.id,{
            title,date,dueDate,description,amount
        },{new:true})
        if(!income){
            return res.status(400).json({
                success:false,
                message:"Soemthing went wrong"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Income Successfully updated"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}