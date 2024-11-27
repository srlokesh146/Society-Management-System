const Expense = require("../models/Expense.model");
const Note = require("../models/Note.model");
const User = require("../models/user.schema");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const { compare } = require("../utils/compare");
const Maintenance = require("../models/maintenance.model");
const Income = require("../models/Income.model");
const Owner = require("../models/Owener.model");
const Tenante = require("../models/Tenent.model");
//create note
exports.CreateNote = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    const notes = new Note({
      title,
      description,
      date,
    });
    await notes.save();
    if (!notes) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Notes Added Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
//get Note
exports.GetAllNotes = async (req, res) => {
  try {
    const find = await Note.find();
    if (!find) {
      return res.status(400).json({
        success: false,
        message: "No data found",
      });
    }
    return res.status(200).json({
      success: true,
      Note: find,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "error in Note find",
    });
  }
};
//get Note
exports.GetByIdNotes = async (req, res) => {
  try {
    const find = await Note.findById(req.params.id);
    if (!find) {
      return res.status(400).json({
        success: false,
        message: "No data found",
      });
    }
    return res.status(200).json({
      success: true,
      Note: find,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "error in Note find",
    });
  }
};
//delete note
exports.DeleteNote = async (req, res) => {
  try {
    const find = await Note.findByIdAndDelete(req.params.id);
    if (!find) {
      return res.status(400).json({
        success: false,
        message: "No data found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Note Delete Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "error in Note find",
    });
  }
};
//update note
exports.UpdateNote = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    const notes = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        date,
      },
      { new: true }
    );
    if (!notes) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Notes Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
//add exppense
exports.CreateExpense = async (req, res) => {
  try {
    const { title, description, date, amount } = req.body;
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
      return "";
    };

    // Upload images to Cloudinary and delete local files
    const bill = await uploadAndDeleteLocal(req.files?.bill);
    if (!title || !description || !date || !amount || !bill) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const expens = new Expense({
      title,
      description,
      date,
      amount,
      bill,
    });
    await expens.save();

    if (!expens) {
      res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Expense successfully created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
//get all expens
exports.GetAllExpense = async (req, res) => {
  try {
    const complaints = await Expense.find();
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
};
//get total expense amount
exports.getTotalExpenseAmount = async (req, res) => {
  try {
    const result = await Expense.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: { $toDouble: "$amount" } },
        },
      },
    ]);

    const totalAmount = result.length > 0 ? result[0].totalAmount : 0;

    return res.status(200).json({
      success: true,
      totalAmount,
    });
  } catch (error) {
    console.error("Error calculating total expense amount:", error);
    return res.status(500).json({
      success: false,
      message: "Error calculating total expense amount",
    });
  }
};
//get by id expens
exports.GetByIdExpense = async (req, res) => {
  try {
    const complaints = await Expense.findById(req.params.id);
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
};
//delete expens
exports.DeleteExpens = async (req, res) => {
  try {
    const complaints = await Expense.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Expense Deleted",
    });
  } catch (error) {
    console.error("Error fetching expense:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching expense",
    });
  }
};
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
      return "";
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
        message: "User not authenticated",
      });
    }

    const isPasswordCorrect = await compare(password, req.user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password verified successfully",
    });
  } catch (error) {
    console.error("Error during password verification:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//add maintenance
exports.CreateMaintenance = async (req, res) => {
  try {
    const { maintenanceAmount, penaltyAmount, dueDate, penaltyDay } = req.body;
    if (!maintenanceAmount || !penaltyAmount || !dueDate || !penaltyDay) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const maintenance = new Maintenance({
      maintenanceAmount,
      penaltyAmount,
      dueDate,
      penaltyDay,
    });
    await maintenance.save();

    const ownerData = await Owner.find();
    const TenantData = await Tenante.find();

    const residentList = [...ownerData, ...TenantData];

    const residentsWithStatus = residentList.map((resident) => ({
      resident: resident.id,
      paymentStatus: "pending",
      residentType: resident.Resident_status,
      paymentMode: "cash",
    }));

    maintenance.residentList = residentsWithStatus;

    await maintenance.save();

    if (!maintenance) {
      return res.status(400).json({
        success: false,
        message: "Soemthing went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Maintenance Successfully Added",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//get maintenance
exports.GetMaintenance = async (req, res) => {
  try {
    // const maintenanceRecords = await Maintenance.find().populate({
    //   path: "residentList.resident",
    // });
    const maintenanceRecords = await Maintenance.find().populate(
      "residentList.resident"
    );
    return res.status(200).json({
      success: true,
      Maintenance: maintenanceRecords,
    });
  } catch (error) {
    console.error("Error fetching Maintenance:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching Maintenance",
    });
  }
};
////update and get payment
exports.updatePaymentMode = async (req, res) => {
  const { maintenanceId } = req.params;
  const { paymentMode } = req.body;
  const residentId = req.user.id;

  console.log(req.body);

  try {
    const updatedMaintenance = await Maintenance.findOneAndUpdate(
      { _id: maintenanceId, "residentList.resident": residentId },
      {
        $set: {
          "residentList.$.paymentMode": paymentMode,
          "residentList.$.paymentStatus": "done",
        },
      },
      { new: true }
    ).populate("residentList.resident");

    if (!updatedMaintenance) {
      return res.status(404).json({
        success: false,
        message: "Maintenance record or resident not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment mode  successfully",
      Maintenance: updatedMaintenance,
    });
  } catch (error) {
    console.error("Error updating payment mode:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating payment mode",
    });
  }
};
//FindByIdUserAndMaintance
exports.FindByIdUserAndMaintance = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    console.log("Logged-in User ID:", loggedInUserId);

    const maintenanceRecords = await Maintenance.find({
      "residentList.resident": loggedInUserId,
    }).populate({
      path: "residentList.resident",
      match: { _id: loggedInUserId },
      select: "name email role",
    });

    console.log("Maintenance Records:", maintenanceRecords);

    if (!maintenanceRecords || maintenanceRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No maintenance records found for the logged-in user.",
      });
    }

    const filteredRecords = maintenanceRecords
      .map((record) => {
        record.residentList = record.residentList.filter(
          (residentEntry) =>
            residentEntry.resident &&
            String(residentEntry.resident._id) === loggedInUserId &&
            residentEntry.paymentStatus === "pending"
        );
        return record;
      })
      .filter((record) => record.residentList.length > 0);

    return res.status(200).json({
      success: true,
      Maintenance: filteredRecords,
    });
  } catch (error) {
    console.error("Error fetching Maintenance:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching Maintenance",
    });
  }
};
exports.applyPenalty = async (req, res) => {
  try {
    console.log("Running penalty application...");

    const today = new Date();

    const maintenances = await Maintenance.find();

    console.log("Found maintenances:", maintenances.length);

    for (const maintenance of maintenances) {
      const { dueDate, penaltyAmount, residentList } = maintenance;

      const dueDateTime = new Date(dueDate).getTime();
      const currentTime = today.getTime();
      const diffDays = Math.ceil(
        (currentTime - dueDateTime) / (1000 * 60 * 60 * 24)
      );

      console.log("Due Date:", dueDate);
      console.log("Difference in days:", diffDays);

      if (diffDays >= 7) {
        for (const resident of residentList) {
          console.log("Resident ID:", resident._id);
          console.log("Resident Payment Status:", resident.paymentStatus);

          if (resident.paymentStatus === "pending") {
            const updatedPenalty = resident.penalty + penaltyAmount;

            console.log(
              `Applying penalty for Resident ID: ${resident._id}. Existing Penalty: ${resident.penalty}, Penalty to Add: ${penaltyAmount}`
            );

            const result = await Maintenance.updateOne(
              { _id: maintenance._id, "residentList._id": resident._id },
              {
                $set: {
                  "residentList.$.penalty": updatedPenalty,
                },
              }
            );

            if (result.nModified > 0) {
              console.log(
                `Penalty applied successfully for Resident ID: ${resident._id}, Maintenance ID: ${maintenance._id}`
              );
            } else {
              console.log(
                `No update made for Resident ID: ${resident._id}, Maintenance ID: ${maintenance._id}`
              );
            }
          }
        }
      }
    }

    console.log("Penalty application completed successfully.");

    if (res) {
      return res.status(200).json({
        success: true,
        message: "Penalties applied successfully for all overdue payments.",
      });
    }
  } catch (error) {
    console.error("Error in applying penalties:", error);

    if (res) {
      return res.status(500).json({
        success: false,
        message: "Error in applying penalties.",
        error: error.message,
      });
    }
  }
};
//get done maintannace
exports.GetMaintananceDone = async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.find({
      "residentList.paymentStatus": "done",
    }).populate("residentList.resident");

    // Filter residentList to include only those with paymentStatus: "done"
    const filteredRecords = maintenanceRecords.map((record) => {
      record.residentList = record.residentList.filter(
        (resident) => resident.paymentStatus === "done"
      );
      return record;
    });

    return res.status(200).json({
      success: true,
      Maintenance: filteredRecords,
    });
  } catch (error) {
    console.error("Error fetching maintenance:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching maintenance",
    });
  }
};
//add income
exports.CreateIncome = async (req, res) => {
  try {
    const { title, date, dueDate, description, amount, member } = req.body;

    // Validate required fields
    if (!title || !date || !dueDate || !description || !amount) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const income = new Income({
      title,
      date,
      dueDate,
      description,
      amount,
      member,
    });

    const ownerData = await Owner.find();
    const tenantData = await Tenante.find();

    const residentList = [...ownerData, ...tenantData];

    console.log("Fetched residents:", residentList);

    const residentsWithStatus = residentList.map((resident) => ({
      resident: resident._id,
      paymentStatus: "pending",
      residentType: resident.Resident_status,
      paymentMode: "cash",
    }));

    income.members = residentsWithStatus;

    await income.save();

    return res.status(200).json({
      success: true,
      message: "Income Successfully Added",
    });
  } catch (error) {
    console.error("Error adding income:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//get income
exports.GetIncome = async (req, res) => {
  try {
    const income = await Income.find().populate("members.resident");
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
};
////update and get payment
exports.updatePaymentModeIncome = async (req, res) => {
  const { incomeId } = req.params;
  const { paymentMode } = req.body;
  const residentId = req.user.id;
  console.log("Resident ID from user:", residentId);
  console.log("Request body:", req.body);

  try {
    const incomeRecord = await Income.findOne({
      _id: incomeId,
      "members.resident": residentId,
    });

    if (!incomeRecord) {
      return res.status(404).json({
        success: false,
        message: "Income record or resident not found",
      });
    }

    const updatedMembers = incomeRecord.members.map((member) => {
      if (member.resident.toString() === residentId) {
        return {
          ...member,
          paymentMode: paymentMode,
          paymentStatus: "done",
        };
      }
      return member;
    });

    incomeRecord.members = updatedMembers;
    incomeRecord.member = incomeRecord.member + 1;
    await incomeRecord.save();

    const populatedIncomeRecord = await incomeRecord.populate(
      "members.resident"
    );

    return res.status(200).json({
      success: true,
      message: "Payment  status  successfully",
      updatedIncome: populatedIncomeRecord,
    });
  } catch (error) {
    console.error("Error updating payment mode:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating payment mode",
    });
  }
};
//get by id income
exports.GetByIdIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id).populate(
      "members.resident"
    );

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income record not found",
      });
    }

    income.members = income.members.filter(
      (member) => member.paymentStatus === "done"
    );

    return res.status(200).json({
      success: true,
      Income: income,
    });
  } catch (error) {
    console.error("Error fetching Income by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching Income",
    });
  }
};
//delete income
exports.DeleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Income deleted",
    });
  } catch (error) {
    console.error("Error fetching Income:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching Income",
    });
  }
};
//update income
exports.UpdateIncome = async (req, res) => {
  try {
    const { title, date, dueDate, description, amount, member } = req.body;
    if (!title || !date || !dueDate || !description || !amount) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const income = await Income.findByIdAndUpdate(
      req.params.id,
      {
        title,
        date,
        dueDate,
        description,
        amount,
      },
      { new: true }
    );
    if (!income) {
      return res.status(400).json({
        success: false,
        message: "Soemthing went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Income Successfully updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//merge payment code
// exports.updatePaymentMode = async (req, res) => {
//   const { type, id } = req.params; // Type (maintenance/income) and ID of the record
//   const { paymentMode } = req.body;
//   const residentId = req.user.id; // Logged-in user's ID

//   try {
//     let Model;
//     if (type === 'maintenance') {
//       Model = Maintenance;
//     } else if (type === 'income') {
//       Model = Income;
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid type specified. Must be 'maintenance' or 'income'."
//       });
//     }

//     // Find and update the record based on residentId, and update paymentMode and paymentStatus
//     const updatedRecord = await Model.findOneAndUpdate(
//       { _id: id, "residentList.resident": residentId },
//       {
//         $set: {
//           "residentList.$.paymentMode": paymentMode,
//           "residentList.$.paymentStatus": "done"
//         }
//       },
//       { new: true }
//     ).populate("residentList.resident");

//     if (!updatedRecord) {
//       return res.status(404).json({
//         success: false,
//         message: "Record or resident not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: `Payment mode updated successfully for ${type}`,
//       data: updatedRecord,
//     });
//   } catch (error) {
//     console.error("Error updating payment mode:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error updating payment mode",
//     });
//   }
// };
//get done and paymented income
exports.GetIncomeDone = async (req, res) => {
  try {
    const incomeRecords = await Income.find({
      "members.paymentStatus": "done",
    }).populate("members.resident");

    const filteredIncome = incomeRecords.map((record) => {
      record.members = record.members.filter(
        (member) => member.paymentStatus === "done"
      );
      return record;
    });

    return res.status(200).json({
      success: true,
      Income: filteredIncome,
    });
  } catch (error) {
    console.error("Error fetching Income:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching Income",
    });
  }
};
//get total done income amount
exports.GetTotalMaintenanceDone = async (req, res) => {
  try {
    const totalMaintenanceDone = await Maintenance.aggregate([
      { $unwind: "$residentList" },

      { $match: { "residentList.paymentStatus": "done" } },

      {
        $addFields: {
          residentAmount: {
            $add: ["$maintenanceAmount", "$residentList.penalty"],
          },
        },
      },

      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$residentAmount" },
        },
      },
    ]);

    const totalAmount =
      totalMaintenanceDone.length > 0 ? totalMaintenanceDone[0].totalAmount : 0;

    return res.status(200).json({
      success: true,
      totalAmount,
    });
  } catch (error) {
    console.error("Error calculating total maintenance done:", error);
    return res.status(500).json({
      success: false,
      message: "Error calculating total maintenance done",
    });
  }
};
//FindByIdUserAndMaintance
exports.FindByIdUserAndIncome = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    console.log("Logged-in User ID:", loggedInUserId);

    const incomerecord = await Income.find({
      "members.resident": loggedInUserId,
    }).populate({
      path: "members.resident",
    });

    if (!incomerecord || incomerecord.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No maintenance records found for the logged-in user.",
      });
    }

    const filteredRecords = incomerecord
      .map((record) => {
        record.members = record.members.filter(
          (residentEntry) =>
            residentEntry.resident &&
            String(residentEntry.resident._id) === loggedInUserId &&
            residentEntry.paymentStatus === "pending"
        );
        return record;
      })
      .filter((record) => record.members.length > 0);

    return res.status(200).json({
      success: true,
      Income: filteredRecords,
    });
  } catch (error) {
    console.error("Error fetching Income:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching Income",
    });
  }
};
//total balance
// exports.GetTotalBalance = async (req, res) => {
//   try {

//     const totalMaintenance = await Maintenance.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalMaintenance: { $sum: "$maintenanceAmount" }
//         }
//       }
//     ]).exec();

//     const totalIncome = await Income.aggregate([
//       {
//         $group: {
//         _id: null,
//         totalIncome: { $sum: "$amount" }
//       }
//     }]).exec();

//     const totalBalance = totalMaintenance[0].totalMaintenance + totalIncome[0].totalIncome;

//     return res.status(200).json({
//       success: true,
//       totalBalance: totalBalance,
//     });
//   } catch (error) {
//     console.error("Error fetching total balance:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error fetching total balance",
//     });
//   }
// };
