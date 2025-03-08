import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import mongoConnect from "./config/db.js";
import { errorResponserHandler } from "./middleware/errorHandler.js";
import { invalidPathHandler } from "./middleware/errorHandler.js";
import { Server } from "socket.io";
import http from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const __dirname = path.resolve();

import cors from "cors";

//routes

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
dotenv.config();
mongoConnect();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);

//static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
