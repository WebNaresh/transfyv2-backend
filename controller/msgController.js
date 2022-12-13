// sendMessage a User
const ErrorHandler = require("../utils/errorHandler");
const catchAssyncError = require("../middleware/catchAssyncError");
const Message = require("../models/messageSchema");

exports.sendMessage = catchAssyncError(async (req, res, next) => {
  const object = req.body;
  const storedMessage = await Message.create(object);
  res.status(201).json({ success: true });
});
// getMessage a User

exports.getMessage = catchAssyncError(async (req, res, next) => {
  const { userId } = req.body;
  let messages = await Message.find({ userId: userId });
  if (messages === null) {
    messages = [];
  }
  res.status(201).json({ success: true, messages });
});
