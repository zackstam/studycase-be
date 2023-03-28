// ...

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const passport = require('passport');
const HttpError = require('../interface/httpError');

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'myscreet',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
          const { userId, name } = token;
          const user = await User.findOne({ name });
          if (user) {
              return done(null, token);
          }
          return done(null, false, { message: errorMessage.UN_AUTHENTICATED });
      } catch (error) {
          return done(error)
      }
    }
  )
);