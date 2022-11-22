const Message = require("../models/messageSchema");
const User = require("../models/userSchema");

global.onlineUsers = new Map();
setInterval(() => {
  console.log(onlineUsers);
}, 2000);
const addUser = (socket, userId) => {
  onlineUsers.set(userId, socket.id);
  const userIds = [];
  onlineUsers.forEach((value, key) => {
    userIds.push(key);
  });
  socket.emit("userOnline", userIds);
  //   User.findById(userId).update({ status: true });
};
const sendMsg = (socket, io, data) => {
  // socket.emit("msg-recieve", data);
  console.log(data, io, socket);
  Message.create({ userId: data.from, to: data.to, msg: data.msg })
    .then((ok) => console.log(ok))
    .catch((e) => console.log(e));
  io.to(onlineUsers.get(data.to)).emit("msg-recieve", data);
};
const disconnect = (socket) => {
  onlineUsers.forEach((value, key) => {
    if (socket.id === onlineUsers.get(key)) {
      onlineUsers.delete(key);
    }
  });
};

module.exports = {
  addUser,
  sendMsg,
  disconnect,
};
