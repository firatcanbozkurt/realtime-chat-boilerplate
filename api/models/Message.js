/**
 *
 * BASED ON THE CONVERSATION ID, WE CAN CREATE MESSAGE DOCUMENTS
 * WE CAN RETRIVE ALL MESSAGES BETWEEN TWO USERS BY QUERYING THE CONVERSATION ID
 *
 */

const mongoose = require("mongoose");
//661e4285b0a79ae872ea0849
const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  sender: {
    type: String,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
