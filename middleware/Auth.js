const jwt = require('jsonwebtoken')
const secret = require('../config')

exports.Auth = async (req, res, next) => {
  if (!req.headers.authorization) {
      return res.status(401).json({
      message: "Auth token missing in header"
    });
  }
  let token = req.headers.authorization.split(" ");
  try{
    const checkJwt = await jwt.verify(token[1],secret.jwtSecret);
    if (Date.now() >= checkJwt.exp *1000){
      res.status(401).json({
        message : "Auth token expired"
      })
    } 
    req.userData = checkJwt;
    console.log(req.userData);
    
    next();
    
  }catch(error){
    return res.status(401).json({
      message: "Auth token invalid"
    });
  }  
};
