const Message = require("../models/messageSchema");
const User = require("../models/userSchema");
const socket = require("../server");

global.onlineUsers = new Map();
global.peerUsers = new Map();
setInterval(() => {
  console.log(onlineUsers);
  console.log(peerUsers, "peerUsers");
}, 2000);
const addUser = (socket, userId, io) => {
  onlineUsers.set(userId, socket.id);
  const userIds = [];
  onlineUsers.forEach((value, key) => {
    userIds.push(key);
  });
  io.emit("userOnline", userIds);
};
const sendMsg = (socket, io, data) => {
  io.to(onlineUsers.get(data.to)).emit("msg-recieve", data);
  if (onlineUsers.get(data.to) === undefined) {
    Message.create({
      userId: data.from,
      to: data.to,
      msg: data.msg,
      seen: false,
    });
  } else {
    Message.create({ userId: data.from, to: data.to, msg: data.msg });
  }
};
const disconnect = (socket) => {
  onlineUsers.forEach((value, key) => {
    if (socket.id === onlineUsers.get(key)) {
      onlineUsers.delete(key);
    }
  });
};
const deleteFromMap = async (socketId) => {
  await onlineUsers.delete(socketId);
};
const userRemoceFromOnlineUser = (socketId, io, socket) => {
  deleteFromMap(socketId).then(() => {
    let userIds = Array.from(onlineUsers.keys());
    socket.disconnect();
    io.emit("userOnline", userIds);
  });
};
const handlePeerSocketConnection = (id, peerId) => {
  peerUsers.set(id, peerId);
};
const searchPeerIdFromMap = (id, socket) => {
  const peerId = peerUsers.get(id);
  console.log(`🚀 ~ peerId`, peerId);
  socket.emit("peerIdGot", peerId);
};

module.exports = {
  addUser,
  sendMsg,
  disconnect,
  userRemoceFromOnlineUser,
  handlePeerSocketConnection,
  searchPeerIdFromMap,
};
