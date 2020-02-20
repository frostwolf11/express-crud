const userModel = require("../models/user-model");

exports.userLogin = async (req, res) => {
  let user_id;
  let user_detail = await userModel.findOne({
    email: req.body.email,
    username: req.body.username
  });
  user_id = user_detail._id;
  if (user_detail == null) {
    res.status(500).json({
      message: "User not exist in database"
    });
  } else {
    res.status(200).json({
      message: "User found",
      access_token: user_id
    });
  }
};
