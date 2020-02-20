const mongoose = require("mongoose");
const database = require("../database");

let addressSchema = new mongoose.Schema({
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

let userAddress = database.model("userAddress", addressSchema); 
module.exports = userAddress
