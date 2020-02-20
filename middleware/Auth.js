const userModel = require("../models/user-model");

exports.Auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({
      message: "Auth token missing in header"
    });
  }
  next();
};
