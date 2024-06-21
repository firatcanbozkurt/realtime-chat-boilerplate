const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
const createUserRoute = require("./routes/createUser");
const authMiddleware = require("./middleware/auth");


// auth middleware
app.use(authMiddleware);

//middleware
app.use(express.json());

// cors
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("connected to db");
});



//app.use("/api/users", userRoute);

app.use("/api/createUser", createUserRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/getUsers", require("./routes/searchUser"));

app.listen(8800, () => {
  console.log("Backend server is running on port 8800!");
});
