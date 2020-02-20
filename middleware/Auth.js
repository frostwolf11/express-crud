const access_tokenModel = require("../models/access-token");

exports.Auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Auth token missing in header"
    });
  }
  let token_expireTime = await access_tokenModel.findOne({
    user_id: req.headers.authorization
  });
  let date = new Date();

  if (Number(date.getHours()) > Number(token_expireTime.expire_time)) {
    return res.status(401).json({
      message: "Access token expired"
    });
  }
  next();
};
