// testController a User
const ErrorHandler = require("../utils/errorHandler");
const catchAssyncError = require("../middleware/catchAssyncError");
const User = require("../models/userSchema");
const sendToken = require("../utils/sendToken");
const jwt = require("jsonwebtoken");

exports.test = catchAssyncError(async (req, res, next) => {
  res.status(200).json({ message: "Route is  working " });
  // const {  } = req.body
});

exports.register = catchAssyncError(async (req, res, next) => {
  const { name, email, userImage } = req.body;
  const existed = await User.find({ name, email }).populate("name");

  if (existed.length === 1) {
    return sendToken(existed[0], res, 201);
  } else {
    const user = await User.create({
      name,
      email,
      userImage,
    });
    sendToken(user, res, 200);
  }
});
// getAllUser a User

exports.getAllUser = catchAssyncError(async (req, res, next) => {
  const { userId } = req.body;
  if (userId === undefined) {
    console.log("i am undefinde");
    return next(new ErrorHandler("provide Id", 400));
  }
  let users = await User.find({ _id: { $ne: userId } }).select([
    "name",
    "email",
    "userImage",
    "_id",
  ]);
  console.log(userId);
  // users.filter((data) => {
  //   console.log(data._id);
  //   return data._id.toString() !== userId;
  // });
  console.log(users, "hello");

  users = jwt.sign({ users }, process.env.jWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  res.status(200).json({
    success: true,
    users,
  });
});
