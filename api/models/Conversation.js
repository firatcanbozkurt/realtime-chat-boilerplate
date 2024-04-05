/**
 * EACH CONVERSATION DOCUMENT WILL HAVE AN ARRAY OF PARTICIPANTS
 * BASED ON THE CONVERSATION ID, WE CAN CREATE MESSAGE DOCUMENTS
 *
 */
const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
