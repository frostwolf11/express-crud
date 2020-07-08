const userModel = require("../models/user-model");
const user_addressModel = require("../models/address");
const crypto = require("crypto");
const jwt = require('jsonwebtoken')
const secret = require('../config')
const mongoose = require('mongoose')

exports.userProfile = async (req, res, next) => {
  console.log(req);
  let userDetail = await userModel.aggregate(
    [{ $match : {_id: mongoose.Types.ObjectId(req.user.user_id)}},
      { $lookup:
        {
          from: "useraddresses",
          localField: "_id",
          foreignField: "user_id",
          as: "address"
        }
      }
    ]
    )

  if (userDetail) {
    res.status(200).json({
      Profile: userDetail
    });
  } else {
    res.status(500).json({
      message: "User does not exist"
    });
  }
};

exports.userDelete = async (req, res, next) => {
  try {
    let user_delete = await userModel.deleteOne({_id: req.headers.authorization});
    res.status(200).json({
      message: "User deleted"
    });
  } catch {
    res.status(500).json({
      message: "User not exist"
    });
  }
};

exports.userProfiles = async (req, res) => {
  let skip = parseInt(req.params.page) * 10;
  let users = await userModel
    .find({})
    .select("-__v")
    .skip(skip)
    .limit(10);
  res.status(200).json({
    count: users.length,
    users: users
  });
};

exports.userAddres = async (req, res, next) => {
  try {
    let user_address = await new user_addressModel({
      user_id: req.userData.user_id,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      pin: req.body.pin,
      phoneNo: req.body.phone_no
    });
    let doc = await user_address.save();
    res.status(201).json({
      message: "Address registered"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.userLogin = async (req, res) => {
  let user_detail = await userModel.findOne({
    email: req.body.email,
    username: req.body.username
  });
  let date = new Date();
  if (user_detail) {
    const token = await jwt.sign({ user_id: user_detail._id, email: user_detail.email },secret.jwtSecret,{ expiresIn: "2hr" })
    res.status(200).json({
      message: "User found",
      access_token: token
    });
  } else {
    res.status(500).json({
      message: "User not exist in database"
    });
  }
};

exports.userRegister = async (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    res.status(400).json({
      message: "Password does not match"
    });
  }
  try {
    let user_create = await new userModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: await crypto
        .createHash("md5")
        .update(req.body.password)
        .digest("hex"),
      username: req.body.username
    });
    let doc = await user_create.save();
    const token = await jwt.sign({ user_id:doc._id, email:doc.email },secret.jwtSecret,{ expiresIn: "2hr" })
    res.status(201).json({
      created_id: doc._id,
      access_token: token
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
