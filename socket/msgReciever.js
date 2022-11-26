const Message = require("../models/messageSchema");
const User = require("../models/userSchema");

global.onlineUsers = new Map();
setInterval(() => {
  console.log(onlineUsers);
}, 2000);
const addUser = (socket, userId, io) => {
  onlineUsers.set(userId, socket.id);
  const userIds = [];
  onlineUsers.forEach((value, key) => {
    userIds.push(key);
  });
  io.emit("userOnline", userIds);
  //   User.findById(userId).update({ status: true });
};
const sendMsg = (socket, io, data) => {
  // socket.emit("msg-recieve", data);
  Message.create({ userId: data.from, to: data.to, msg: data.msg });
  io.to(onlineUsers.get(data.to)).emit("msg-recieve", data);
};
const disconnect = (socket) => {
  onlineUsers.forEach((value, key) => {
    if (socket.id === onlineUsers.get(key)) {
      onlineUsers.delete(key);
    }
  });
};
const deleteFromMap = async (socketId) => {
  console.log(onlineUsers.get(socketId));
  await onlineUsers.delete(socketId);
};
const userRemoceFromOnlineUser = (socketId, io, socket) => {
  deleteFromMap(socketId).then(() => {
    let userIds = Array.from(onlineUsers.keys());
    console.log(userIds, "2");
    socket.disconnect();
    io.emit("userOnline", userIds);
  });
};

module.exports = {
  addUser,
  sendMsg,
  disconnect,
  userRemoceFromOnlineUser,
};
