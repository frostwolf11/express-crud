const userModel = require("../models/user-model");
const user_addressModel = require("../models/address");

exports.userProfile = async (req, res, next) => {
  let userDetail = await userModel
    .find({ _id: req.headers.authorization })
    .populate("mine_address");
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
    let user_delete = await userModel.deleteOne({
      _id: req.headers.authorization
    });
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
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      pin: req.body.pin,
      phoneNo: req.body.phone_no
    });
    let doc = await user_address.save();

    let user_detail = await userModel.findOneAndUpdate(
      { _id: req.headers.authorization },
      {
        $push: {
          mine_address: doc._id
        }
      }
    );
    await user_detail;
    res.status(201).json({
      message: "Address registered"
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create address"
    });
  }
};
