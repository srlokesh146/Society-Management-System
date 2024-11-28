const User = require("../models/user.schema");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const { compare } = require("../utils/compare");
const Maintenance = require("../models/maintenance.model");
const Income = require("../models/Income.model");
const Owner = require("../models/Owener.model");
const Tenante = require("../models/Tenent.model");
const Notification = require("../models/notification.schema");
//add income
exports.CreateIncome = async (req, res) => {
  try {
    const { title, date, dueDate, description, amount, member } = req.body;

    
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

    const residentsWithStatus = residentList.map((resident) => ({
      resident: resident._id,
      paymentStatus: "pending",
      residentType: resident.Resident_status,
      paymentMode: "cash",
    }));

    income.members = residentsWithStatus;

    await income.save();

    //add notification

     
    const adminUsers = await User.find({}, '_id');
    const ownerUsers = ownerData.map(owner => ({ _id: owner._id, model: "Owner" }));
    const tenantUsers = tenantData.map(tenant => ({ _id: tenant._id, model: "Tenante" }));

   
    const allUsers = [
      ...adminUsers.map(admin => ({ _id: admin._id, model: "User" })), 
      ...ownerUsers,
      ...tenantUsers
    ];

    
  
    
    const notification = new Notification({
      title: "Income created",
      name: `${title}`,
      message: `Per person amount :-  ${amount} rupees. - Duedate ${dueDate}`,
      users:allUsers
    });
  
   
    await notification.save();

    return res.status(200).json({
      success: true,
      message: "Income Successfully Added",
    });
  } catch (error) {
    
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


   
    // const residentData = await Owner.findById(residentId) || await Tenante.findById(residentId);
    // const userName = residentData ? residentData.Full_name : "Resident";
    // const unit = residentData?.Unit || "unknown unit";
    // const wing = residentData?.Wing || "unknown wing";

    
    // const notification = new Notification({
    //   title: "Income Payment Done",
    //   name: "Annual Income",
    //   message: `${userName} from unit ${unit}, wing ${wing} has completed an income payment of ${incomeRecord.amount} rupees.`,
    //   users: [{ _id: residentId, model: residentData ? "Owner" : "Tenante" }] 
    // });
    // await notification.save();

   
    const populatedIncomeRecord = await incomeRecord.populate("members.resident");

    return res.status(200).json({
      success: true,
      message: "Payment  status  successfully",
      updatedIncome: populatedIncomeRecord,
    });
  } catch (error) {
    
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
   
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
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
   
    return res.status(500).json({
      success: false,
      message: "Error fetching Income",
    });
  }
};
//get total done income amount
exports.GetTotalIncomeeDone = async (req, res) => {
  try {
    const totalIncomeDone = await Income.aggregate([
      { $unwind: "$members" },
      { $match: { "members.paymentStatus": "done" } },
      {
        $addFields: {
          residentAmount: {
            $add: ["$amount", { $ifNull: ["$members.penalty", 0] }] 
          }
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
      totalIncomeDone.length > 0 ? totalIncomeDone[0].totalAmount : 0;

    return res.status(200).json({
      success: true,
      totalAmount,
    });
} catch (error) {
   
    return res.status(500).json({
      success: false,
      message: "Error calculating total income done",
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
   
    return res.status(500).json({
      success: false,
      message: "Error fetching Income",
    });
  }
};

