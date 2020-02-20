const userModel = require("../models/user-model");

exports.userProfile = async (req, res, next) => {
  let userDetail = await userModel
    .findOne({ _id: req.headers.authorization })
    .select("-__v");
  console.log("ABLE TO COME HERE");

  if (userDetail != null) {
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
