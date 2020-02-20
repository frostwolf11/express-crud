const mongoose = require("mongoose");
const database = require("../database");

let accessToken = new mongoose.Schema({
  user_id: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  access_token: {
    type: String,
    required: true
  },
  expire_time: {
    type: Number,
    required: true
  }
});

module.exports = database.model('accessToken',accessToken)
