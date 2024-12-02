const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  time: {
    type: String,
  },
});

const groupChatModel = mongoose.model("GroupChat", groupChatSchema);

module.exports = groupChatModel;
