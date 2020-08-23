const axios = require('axios');
const { config } = require('dotenv');
const debug = require('debug')('dev');
const { OAuth2Client } = require('google-auth-library');
const passport = require('passport');
const { Strategy } = require('passport');
const { ApplicationError } = require('../helpers/error');
const { generateToken } = require('../helpers/auth');
const models = require('../models');

config();

const { User } = models;
const {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  REDIRECT_URL,
} = process.env;
const twitterConfig = {
  consumerKey: TWITTER_API_KEY,
  consumerSecret: TWITTER_API_SECRET,
  callbackURL: `${REDIRECT_URL}`,
  includeEmail: true,
  profileFields: ['id', 'displayName', 'photos', 'email'],
};

async function facebookAuth({ accessToken }) {
  const appAccessTokenURL = `https://graph.facebook.com/oauth/access_token?client_id=${FACEBOOK_APP_ID}&client_secret=${FACEBOOK_APP_SECRET}&grant_type=client_credentials`;

  const { data: appAccessDetails } = await axios.get(appAccessTokenURL);
  const { access_token: appAccessToken } = appAccessDetails;

  const verifyUserAccessTokenURI = `
  https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appAccessToken}`;

  const { data: verificationDetails } = await axios.get(verifyUserAccessTokenURI);
  const { is_valid: isValid, app_id: appId } = verificationDetails.data;

  if (FACEBOOK_APP_ID !== appId) {
    throw new ApplicationError(
      500,
      `invalid app id: expected [${FACEBOOK_APP_ID}] but was [${appId}]`,
    );
  }
  if (!isValid) throw new ApplicationError(500, 'user access token is invalid');

  const getUserDataURL = `https://graph.facebook.com/me?fields=id,first_name,last_name,email,picture&access_token=${accessToken}`;

  const { data: userData } = await axios.get(getUserDataURL);
  const { first_name: firstName, last_name: lastName, email } = userData;
  const { url: avatarUrl } = userData.picture.data;

  return {
    firstName,
    lastName,
    email,
    avatarUrl,
  };
}

async function googleAuth({ accessToken }) {
  const client = new OAuth2Client(GOOGLE_CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: accessToken,
    audience: GOOGLE_CLIENT_ID,
  });
  const {
    given_name: firstName, family_name: lastName, picture, email,
  } = ticket.getPayload();

  return {
    avatarUrl: picture,
    email,
    firstName,
    lastName,
  };
}

async function createOrFindUser({ firstName, lastName, email }) {
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        email,
        password: '',
      },
    });

    const { id, createdAt } = user;
    const token = generateToken({ id });
    const userDetails = {
      id,
      firstName,
      lastName,
      email,
      createdAt,
    };
    const status = created ? 201 : 200;

    return { status, data: { user: userDetails, token } };
  } catch (error) {
    throw ApplicationError(500, error);
  }
}

function performCallback(accessToken, refreshToken, profile, done) {
  const { displayName, emails, photos } = profile;

  const [firstName, lastName] = displayName.split(' ');
  const user = {
    firstName,
    lastName,
    email: emails[0].value,
    avatarUrl: photos[0].value,
  };

  return done(null, user);
}

passport.use('twitter', new Strategy(twitterConfig, performCallback));

module.exports = {
  facebookAuth,
  googleAuth,
  createOrFindUser,
};
