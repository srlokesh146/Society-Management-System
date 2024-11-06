const { Schema, model } = require("mongoose");

const announcement =new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        reqired:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    time: {
    type: String,
    default: function() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format and handle 0 as 12
      return `${formattedHours}:${minutes} ${ampm}`;
    }
  }
},{timestamps:true})
const Announcement = model("Announcement",announcement)
module.exports=Announcement;