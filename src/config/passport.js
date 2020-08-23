const { config } = require('dotenv');
const debug = require('debug')('dev');
const passport = require('passport');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const models = require('../models');

config();

const { User } = models;
const {
  BASE_URL,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
} = process.env;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * @description sign in with Facebook
 */
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: `${BASE_URL}/auth/facebook/callback`,
}), (request, accessToken, profile, done) => {
  debug('request =>', request);
  debug('accessToken =>', accessToken);
  debug('profile =>', profile);
});
