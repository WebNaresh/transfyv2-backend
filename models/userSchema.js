const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your name"],
    maxLength: [30, "name cannot exceed 30 characters"],
    minLength: [4, "name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter E-mail"],
  },
  avatar: {
    type: String,
    required: true,
  },
  greetings: {
    type: String,
    default: "Say Hello to ",
  },
  status: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Number,
    default: 0,
  },
});

// User.pre("save", async function (next) {
//     if (!this.isModified('password')) {
//         next();
//     }
//     this.password = await bcrypt.hash(this.password, 10);
//     this.lastMessage = `say hi to ${this.name}`;
//     var dt = new Date();
//     var hours = dt.getHours(); // gives the value in 24 hours format
//     var AmOrPm = hours >= 12 ? 'pm' : 'am';
//     hours = hours % 12 || 12;
//     var minutes = dt.getMinutes();
//     var finalTime = +hours + ':' + minutes + ' ' + AmOrPm;
//     this.lastMessageTime = `${finalTime}`;
// });
User.methods.getJWTToken = function () {
  return jwt.sign({ user: this }, process.env.jWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", User);
