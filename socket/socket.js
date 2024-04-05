// server.js

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());
//app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Client Side
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const PORT = 3000;

// Define connected users array
let connectedUsers = [];

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join app
  socket.on("join", (userData) => {
    connectedUsers.push({ id: socket.id, user: userData.username });
    io.emit("userJoined", userData.username);
    io.emit("getAllUsers", connectedUsers);
  });

  // Handle chat messages
  socket.on("chat message", (data) => {
    const { receiverUser, message } = data;
    const receiverSocket = connectedUsers.find(
      (user) => user.user === receiverUser
    );
    if (receiverSocket) {
      io.to(receiverSocket.id).emit("chat message", {
        sender: connectedUsers.find((user) => user.id === socket.id).user,
        message,
      });
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    const user = connectedUsers.find((user) => user.id === socket.id);
    if (user) {
      connectedUsers = connectedUsers.filter((u) => u.id !== socket.id);
      io.emit("userLeft", user.user);
      io.emit("getAllUsers", connectedUsers);
    }
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});