// Dependencies
const mongoose = require("mongoose");
const moment = require('moment');

// Format dates
moment().format();

/**
 * Schema for a user in the system
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 300
  },
  profileImage: {
    type: String,
    required: false
  }
});

const user = mongoose.model("user", userSchema);

module.exports = user;
