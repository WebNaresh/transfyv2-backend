const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  process.exit(1);
});
// Config
dotenv.config();
// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT || 3000, () => {});

const users = [{}];
// socket io connection
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "https://iamnaresh.netlify.app"],
    credentials: true,
  },
});
global.onlineUsers = new Map();

io.on("connect", (socket) => {
  socket.on("hello", (arg) => {});
  // global.chatSocket = socket;
  socket.on("add", (userId) => {
    socket.broadcast.emit("userOnline", userId);
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    console.log(data);
    socket.emit("msg-recieve", data);
    console.log(data.from);
    io.to(onlineUsers.get(data.to)).emit("msg-recieve", data);
  });
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  server.close(() => {
    process.exit(1);
  });
});

// setInterval(() => {
//   console.log(onlineUsers);
// }, 2000);
