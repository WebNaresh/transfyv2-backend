// testController a User
const ErrorHandler = require('../utils/errorHandler');
const catchAssyncError = require('../middleware/catchAssyncError');
const User = require('../models/userSchema');


exports.test = catchAssyncError(async (req, res, next) => {
    res.status(200).json({ message: 'Route is  working ' });
    // const {  } = req.body
});