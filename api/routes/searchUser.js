const router = require("express").Router();
const User = require("../models/User");

router.get("/:searchParams", async (req, res) => {
  try {
    const searchParams = req.params.searchParams;
    const users = await User.find({
      name: { $regex: searchParams, $options: "i" },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
