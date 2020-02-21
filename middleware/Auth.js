const access_tokenModel = require("../models/access-token");
const jwt = require('jsonwebtoken')
const secret = require('../config')

exports.Auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Auth token missing in header"
    });
  }
  try{
   console.log(secret.jwtSecret);
   let token = req.headers.authorization.split(" ");
   const checkJwt = jwt.verify(token[1],secret.jwtSecret);
   console.log("HMMM");
   
   req.userDate = checkJwt;
   console.log("here");
   
   next();
  }catch(error){
    return res.status(401).json({
      "message": 'Auth failed'
    })
  }
  
};
