const mongoose = require('mongoose');
const User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your name'],

        unique: true
    },

});


module.exports = mongoose.model('User', User);