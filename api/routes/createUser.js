const router = require("express").Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:userId", async (req, res) => {
  const isUserExist = await User.findById(req.params.userId);
  if (isUserExist) {
    res.status(200).json(isUserExist);
  } else {
    res.status(404).json("User not found");
  }
});

router.get("/getUsers", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

module.exports = router;
