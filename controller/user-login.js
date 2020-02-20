const userModel = require("../models/user-model");
const access_tokenModel = require("../models/access-token");
const crypto = require("crypto");

exports.userLogin = async (req, res) => {
  let user_detail = await userModel.findOne({
    email: req.body.email,
    username: req.body.username
  });
  let date = new Date();
  if (user_detail) {
    let access_token_detail = await access_tokenModel.findOneAndUpdate(
      {
        user_id: user_detail._id
      },
      {
        $set: {
          user_id: user_detail._id,
          access_token: await crypto
            .createHash("md5")
            .update(date.getHours().toString())
            .digest("hex"),
          expire_time: date.getHours() + 1
        }
      },{
          upsert : true
      }
    );
    res.status(200).json({
      message: "User found",
      access_token: user_detail._id
    });
  } else {
    res.status(500).json({
      message: "User not exist in database"
    });
  }
};
