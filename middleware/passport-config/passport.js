const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt;
const secret = require('.')

module.exports = (passport) => {
    passport.use(new jwtStrategy({
    secretOrKey : secret.jwtSecret,
    jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken()
  }, async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }));
};
