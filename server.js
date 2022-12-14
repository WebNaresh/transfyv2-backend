const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const {
  addUser,
  sendMsg,
  disconnect,
  userRemoceFromOnlineUser,
  handlePeerSocketConnection,
  searchPeerIdFromMap,
} = require("./socket/msgReciever");
// Handling Uncaught Exception
// process.on("uncaughtException", (err) => {
//   process.exit(1);
// });
// Config
dotenv.config();
// Connecting to database
connectDatabase();

const server = app.listen(4000, () => {});

const users = [{}];
// socket io connection
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "https://iamnaresh.netlify.app"],
    credentials: true,
  },
});

io.on("connect", (socket) => {
  module.exports = socket;
  socket.on("add", (userId) => {
    addUser(socket, userId, io);
  });
  socket.on("send-msg", (data) => {
    sendMsg(socket, io, data);
  });
  socket.on("disconnect", (data) => {
    disconnect(socket);
  });

  socket.on("dis", (socketId) => {
    userRemoceFromOnlineUser(socketId, io, socket);
  });
  socket.on("peerConnection", ({ userId, peerIdI }) => {
    handlePeerSocketConnection(userId, peerIdI);
  });
  socket.on("getPeerId", (id) => {
    searchPeerIdFromMap(id, socket);
  });
});

// Unhandled Promise Rejection
// process.on("unhandledRejection", (err) => {
//   server.close(() => {
//     process.exit(1);
//   });
// });
