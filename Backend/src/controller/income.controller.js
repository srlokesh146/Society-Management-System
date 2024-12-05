const User = require("../models/user.schema");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const { compare } = require("../utils/compare");
const Maintenance = require("../models/maintenance.model");
const Income = require("../models/Income.model");
const Owner = require("../models/Owener.model");
const Tenante = require("../models/Tenent.model");
const Notification = require("../models/notification.schema");
const PDFDocument = require('pdfkit');
const path = require('path');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const constant = require("../config/constant");
const razorpay = new Razorpay({
  key_id: constant.key_id,
  key_secret:constant.key_secret,
});
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
      notification
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
  const { paymentMode, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
  const residentId = req.user.id;

  try {
    // Find the income record
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

    // If Razorpay payment mode, verify the payment
    if (paymentMode === "Razorpay") {
      if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
        return res.status(400).json({
          success: false,
          message: "Razorpay payment details are required",
        });
      }

      // Verify Razorpay payment signature
      const generatedSignature = crypto
        .createHmac("sha256", constant.key_secret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");
      console.log(generatedSignature);
      
      if (generatedSignature !== razorpaySignature) {
        return res.status(400).json({
          success: false,
          message: "Payment verification failed",
        });
      }
    }

    // Update the member's payment details
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

    // Populate the updated income record
    const populatedIncomeRecord = await incomeRecord.populate("members.resident");

    return res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      updatedIncome: populatedIncomeRecord,
    });
  } catch (error) {
    console.error("Error in updating payment mode:", error);
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
exports.GeneratePdf = async (req, res) => {
  const {
    invoiceId,
    ownerName,
    billDate,
    paymentDate,
    eventDate,
    phoneNumber,
    email,
    eventName,
    description,
    maintenanceAmount,
    grandTotal,
    note,
  } = req.body;

  const doc = new PDFDocument({ margin: 40 });

  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');

  
  doc.pipe(res);

  
  doc
    .fontSize(18)
    .text('Event Invoice', { align: 'center' })
    .moveDown();

  
  doc
    .fontSize(12)
    .text(`Invoice ID: ${invoiceId}`)
    .text(`Owner Name: ${ownerName}`)
    .text(`Bill Date: ${billDate}`)
    .text(`Payment Date: ${paymentDate}`)
    .text(`Event Date: ${eventDate}`)
    .text(`Phone Number: ${phoneNumber}`)
    .text(`Email: ${email}`)
    .moveDown();

 
  doc
    .fontSize(12)
    .text(`Event Name: ${eventName}`)
    .text(`Description: ${description}`)
    .moveDown();

  
  doc
    .fontSize(14)
    .text('Invoice Summary', { align: 'center' })
    .moveDown(0.5);

  const tableTop = doc.y;
  const tableLeft = 50;

  
  doc
    .fontSize(10)
    .text('Details', tableLeft, tableTop)
    .text('Amount (₹)', 400, tableTop, { width: 90, align: 'right' });

  
  doc
    .moveTo(tableLeft, tableTop + 15)
    .lineTo(500, tableTop + 15)
    .stroke();

  
  let yPosition = tableTop + 25;

  const addTableRow = (label, value) => {
    doc
      .fontSize(10)
      .text(label, tableLeft, yPosition)
      .text(`₹${value.toLocaleString()}`, 400, yPosition, { width: 90, align: 'right' });
    yPosition += 20; 
  };

  addTableRow('Maintenance Amount', maintenanceAmount);
  addTableRow('Grand Total', grandTotal);

  
  doc
    .moveTo(tableLeft, yPosition)
    .lineTo(500, yPosition)
    .stroke();

  
  yPosition += 20;
  doc
    .fontSize(12)
    .text('Note:', tableLeft, yPosition)
    .fontSize(10)
    .text(note || '--', tableLeft + 50, yPosition);

  
  doc
    .moveDown(2)
    .fontSize(10)
    .text('Thank you for your payment!', { align: 'center' });

  
  doc.end();
};

