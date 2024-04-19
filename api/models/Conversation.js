/**
 * EACH CONVERSATION DOCUMENT WILL HAVE AN ARRAY OF PARTICIPANTS
 * BASED ON THE CONVERSATION ID, WE CAN CREATE MESSAGE DOCUMENTS
 *
 */
const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  members: [
    {
      type: String,
      required: true,
      // unique: true,
    },
  ],
});

conversationSchema.index({ members: 1 }, { unique: true });

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
