const { Schema, model, default: mongoose } = require("mongoose");

const maintenanceschema = new Schema(
  {
    maintenanceAmount: {
      type: Number,
      required: true,
    },
    penaltyAmount: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    penaltyDay: {
      type: String,
      required: true,
    },
    residentList: [
      {
        resident: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "residentType",
          required: true,
        },
        residentType: {
          type: String,
          required:true,
          enum: ["Owner", "Tenante"],
        },
        paymentStatus: {
          type: String,
          enum: ["pending", "online", "cash", "done"],
          default: "pending",
        },
        penalty: {
          type: Number,
          default: 0,
        },
      },
    ],
    // maintenanceapplyer: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },
  },
  { timestamps: true }
);
const Maintenance = model("Maintenance", maintenanceschema);
module.exports = Maintenance;
