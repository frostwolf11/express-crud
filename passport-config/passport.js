const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt;
const secret = require('../config')

module.exports = function(passport){
    passport.use(new jwtStrategy({
    secretOrKey : secret.jwtSecret,
    jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken()
  }, async (token, done) => {
    try {
      return done(null,token);
    } catch (error) {
      done(error);
    }
  }));
};
