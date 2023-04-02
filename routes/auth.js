const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const HttpError = require('../interface/httpError');
const { NOT_AUTHENTICATED_CODE } = require('../constant/errorCode');
const {  UNAUTHORIZED } = require('../constant/errorHttp');

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            console.log('eror');
            const error = new HttpError(info.message, NOT_AUTHENTICATED_CODE, UNAUTHORIZED);
            return next(error);
          }
          const userField = {
            name: user.name,
            _id: user._id
          }
          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);
              const token = jwt.sign({ userId: user._id, name: user.name }, 'myscreet', { expiresIn: '1800s' });
              return res.status(200).json({ message: 'success', data: { user: userField, token }});
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

module.exports = router;

