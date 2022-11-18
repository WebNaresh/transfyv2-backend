// sendMessage a User
const ErrorHandler = require("../utils/errorHandler");
const catchAssyncError = require("../middleware/catchAssyncError");
const Message = require("../models/messageSchema");

exports.sendMessage = catchAssyncError(async (req, res, next) => {
  console.log("hello");
  const object = req.body;
  console.log(`🚀 ~ object`, req.body);
  const storedMessage = await Message.create(object);
  res.status(201).json({ success: true });
});
// getMessage a User

exports.getMessage = catchAssyncError(async (req, res, next) => {
  console.log("hello");
  const { userId } = req.body;
  console.log(`🚀 ~  req.body`, req.body);
  console.log(`🚀 ~ userId`, userId);
  let messages = await Message.find({ userId: userId });
  console.log(messages);
  if (messages === null) {
    messages = [];
  }
  res.status(201).json({ success: true, messages });
});
