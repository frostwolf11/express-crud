const mongoose = require("mongoose");
const database = require("../database");

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  mine_address: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "userAddress"
    }]
});

let User = database.model("User", userSchema);
module.exports = User
