const router = require("express").Router();
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");
//new conv

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderEmail, req.body.receiverEmail],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userEmail", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userEmail] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: {
        $all: [req.params.firstUserEmail, req.params.secondUserEmail],
      },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getAllMessagesAndConversations/:userEmail", async (req, res) => {
  const user = req.params.userEmail;
  console.log(user);

  try {
    const conversations = await Conversation.find({
      members: { $in: [user] },
    });
    console.log(conversations);
    const response = await Promise.all(
      conversations.map(async (conversation) => {
        const messages = await Message.find({
          conversationId: conversation._id,
        });

        const random = Math.floor(Math.random() * 15) + 1;
        const receiverUserEmail = conversation.members.filter(
          (member) => member !== user
        )[0];
        console.log("RECEIVER", receiverUserEmail);
        const receiverUserName = await User.find({
          username: receiverUserEmail,
        });
        console.log("RECEIVER USER OBJECT", receiverUserName);
        const conversationObject = {
          picture: `assets/img/avatars/${random}.jpg`,
          conversationId: conversation._id,
          members: conversation.members,
          name: receiverUserName.length > 0 ? receiverUserName[0].name : "",
          lastMessageTime:
            messages.length > 0 ? messages[messages.length - 1].timestamp : "",
          lastMessage:
            messages.length > 0 ? messages[messages.length - 1].content : "",
          messages: messages || [],
        };

        return conversationObject;
      })
    );

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

module.exports = router;
