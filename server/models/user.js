const mongoose = require("mongoose");

const User = mongoose.model("users", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true, //admin,employee
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = User;
