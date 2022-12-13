const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Message = new mongoose.Schema(
  {
    msg: {
      type: Array,
      required: [true, "Please Enter Your message"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please Enter Your userId"],
      ref: "User",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please Enter Your to"],
      ref: "User",
    },
    seen: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
// Message.pre("save", async function (next) {
//     var dt = new Date();
//     var hours = dt.getHours(); // gives the value in 24 hours format
//     var AmOrPm = hours >= 12 ? 'pm' : 'am';
//     hours = hours % 12 || 12;
//     var minutes = dt.getMinutes();
//     var finalTime = +hours + ':' + minutes + ' ' + AmOrPm;
//     this.time = `${finalTime}`;
// });
Message.pre("insertMany", async function (next, docs) {});

module.exports = mongoose.model("Message", Message);
