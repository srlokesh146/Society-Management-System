const User = require("../models/user.schema");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const { compare } = require("../utils/compare");
const Maintenance = require("../models/maintenance.model");
const Owner = require("../models/Owener.model");
const Tenante = require("../models/Tenent.model");
const Notification = require("../models/notification.schema");
const PDFDocument = require('pdfkit');
const path = require('path');
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

    //add notification

    const adminUsers = await User.find({}, "_id");
    const ownerUsers = ownerData.map((owner) => ({
      _id: owner._id,
      model: "Owner",
    }));
    const tenantUsers = TenantData.map((tenant) => ({
      _id: tenant._id,
      model: "Tenante",
    }));

    const allUsers = [
      ...adminUsers.map((admin) => ({ _id: admin._id, model: "User" })),
      ...ownerUsers,
      ...tenantUsers,
    ];

    const notification = new Notification({
      title: "New Maintenance Added",
      name: "Annual Maintenance",
      message: `Per person amount :-  ${maintenanceAmount} rupees. - Duedate ${dueDate}`,
      users: allUsers,
    });

    await notification.save();

    if (!maintenance) {
      return res.status(400).json({
        success: false,
        message: "Soemthing went wrong",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Maintenance Successfully Added",
      notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//get maintenance
exports.GetMaintenance = async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.find().populate(
      "residentList.resident"
    );
    return res.status(200).json({
      success: true,
      Maintenance: maintenanceRecords,
    });
  } catch (error) {
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

  const maintenanceRecord = await Maintenance.findById(maintenanceId);
  if (!maintenanceRecord) {
    return res.status(404).json({
      success: false,
      message: "Maintenance record not found",
    });
  }

  const maintenanceAmount = maintenanceRecord.maintenanceAmount;
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
    const maintenanceRecords = await Maintenance.find({
      "residentList.resident": loggedInUserId,
    }).populate({
      path: "residentList.resident",
      match: { _id: loggedInUserId },
      select: "name email role",
    });

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
    return res.status(500).json({
      success: false,
      message: "Error fetching Maintenance",
    });
  }
};
exports.applyPenalty = async (req, res) => {
  try {
    const today = new Date();

    const maintenances = await Maintenance.find();

    for (const maintenance of maintenances) {
      const { dueDate, penaltyAmount, residentList } = maintenance;

      const dueDateTime = new Date(dueDate).getTime();
      const currentTime = today.getTime();
      const diffDays = Math.ceil(
        (currentTime - dueDateTime) / (1000 * 60 * 60 * 24)
      );

      if (diffDays >= 7) {
        for (const resident of residentList) {
          if (resident.paymentStatus === "pending") {
            const updatedPenalty = resident.penalty + penaltyAmount;

            const result = await Maintenance.updateOne(
              { _id: maintenance._id, "residentList._id": resident._id },
              {
                $set: {
                  "residentList.$.penalty": updatedPenalty,
                },
              }
            );
          }
        }
      }
    }
    if (res) {
      return res.status(200).json({
        success: true,
        message: "Penalties applied successfully for all overdue payments.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in applying penalties.",
      error: error.message,
    });
  }
};

//get done maintannace
exports.GetMaintananceDone = async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.find({
      "residentList.paymentStatus": "done",
    }).populate("residentList.resident");

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
    return res.status(500).json({
      success: false,
      message: "Error fetching maintenance",
    });
  };
}

exports.GeneratePdf = async (req, res) => {
  try {
  
    const {
      invoiceId,
      ownerName,
      billDate,
      paymentDate,
     
      phoneNumber,
      email,
      Wing,
      Unit,
      maintenanceAmount,
      penaltyAmount,
      grandTotal,
      note,
    } = req.body;

    const doc = new PDFDocument({ margin: 40 });

   
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=maintenance_invoice.pdf');

    
    doc.pipe(res);

   
    doc
      .fontSize(18)
      .text('Maintenance Invoice', { align: 'center' })
      .moveDown();

   
    doc
      .fontSize(12)
      .text(`Invoice ID: ${invoiceId}`)
      .text(`Owner Name: ${ownerName}`)
      .text(`Bill Date: ${billDate}`)
      .text(`Payment Date: ${paymentDate || '--'}`)
      
      .text(`Phone Number: ${phoneNumber}`)
      .text(`Email: ${email}`)
      .text(`Address: ${Wing || 'N/A'}-${Unit || 'N/A'}`)
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
    addTableRow('Penalty Amount', penaltyAmount);
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

  } catch (error) {
    console.error('Error generating maintenance invoice:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};