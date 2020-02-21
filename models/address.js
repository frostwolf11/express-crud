const mongoose = require("mongoose");
const database = require("../database");

let addressSchema = new mongoose.Schema({
  user_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userAddress"
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pin: {
    type: Number,
    required: true
  },
  phoneNo: {
    type: Number,
    required: true
  }
});

module.exports = database.model("userAddress", addressSchema);
