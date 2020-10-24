const { ApplicationError, NotFoundError } = require('../helpers/error');
const {
  createOrFindUser, facebookAuth, googleAuth,
} = require('../services/authentication');
const {
  emailVerificationLink, urlSafeRandomString, generateToken,
} = require('../helpers/auth');
const models = require('../models');
const notification = require('../services/Notification');
const { Op } = require('sequelize');

const { User } = models;

module.exports = {
  getCurrentConfig: async (request, response) => {

    // const user = request.user?.id ? await User.findOne({ 
    //   where: {id: request.user?.id},
    //   attributes: ['id', 'name']
    // }) : { id: 0 };

    return response.status(200).json({
      status: 'success',
      result: { session: {userId: request.userId } },
    });
  },

  signup: async (request, response) => {
    const existingUser = await User.getExistingUser(request.body.email);
    if (existingUser) throw new ApplicationError(409, 'email is already registered');

    const user = await User.create(request.body);
    const token = generateToken(user);

    notification.emit('notification', {
      type: 'accountCreated',
      payload: [{
        email: user.email,
        firstName: user.firstName,
        verification_link: emailVerificationLink(user.verifyToken),
      }],
    });

    return response.status(201).json({
      status: 'success',
      message: 'user created successfully',
      result: { user: user.toJSON(), token },
    });
  },

  signin: async (request, response) => {
    const { usernameOrEmail, password } = request.body;

    const user = await User.findOne({ 
      where: {
        [Op.or]: { username: usernameOrEmail, email: usernameOrEmail }
      }
    });
    if (!user) throw new ApplicationError(401, 'Invalid username, email or password');

    const isPassword = await user.validatePassword(password);
    if (!isPassword) {
      throw new ApplicationError(401, 'Invalid username, email or password is incorrect');
    }

    const token = generateToken(user);

    return response.status(200).json({
      status: 'success',
      result: { user: user.toJSON(), accessToken: token, expireInSeconds: 24 * 3600, encryptedAccessToken: token },
    });
  },

  socialLogin: async (request, response) => {
    const { provider } = request.params;
    const handler = { facebook: facebookAuth, google: googleAuth };

    const userDetails = await handler[provider](request.body);
    const { status, data } = await createOrFindUser(userDetails);

    return response.status(status).json({
      status: 'success',
      data,
    });
  },

  twitterLogin: async (request, response) => {
    const { status, data } = await createOrFindUser(request.user);
    return response.status(status).json({
      status: 'success',
      data,
    });
  },

  verifyEmail: async (request, response) => {
    const { token } = request.params;

    const isToken = await User.findOne({ where: { verifyToken: token } });
    if (!isToken || new Date() >= isToken.expireVerifyToken) {
      throw new ApplicationError(400, 'invalid/expired link. request for another');
    }
    if (isToken.isVerified) throw new ApplicationError(400, 'user already verified');

    isToken.isVerified = true;
    await isToken.save();

    return response.status(200).json({
      status: 'success',
      message: 'user successfully verified',
    });
  },

  resendEmailVerification: async (request, response) => {
    const { email } = request.body;

    const user = await User.findOne({ where: { email } });
    if (!user) throw new NotFoundError('user with email doesn\'t exist');
    if (user.isVerified) throw new ApplicationError(400, 'user already verified');

    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 5);

    user.verifyToken = urlSafeRandomString({ length: 64 });
    user.expireVerifyToken = expiryDate;
    await user.save();

    notification.emit('notification', {
      type: 'accountCreated',
      payload: [{
        email: user.email,
        firstName: user.firstName,
        verification_link: emailVerificationLink(user.verifyToken),
      }],
    });

    return response.status(200).json({
      status: 'success',
      message: 'verification email sent',
    });
  },

  forgotPassword: async (request, response) => {
    const { email } = request.body;

    const user = await User.getExistingUser(email);
    if (!user) throw new NotFoundError(`user with email "${email}" does not exist`);

    const token = await user.generateVerificationToken();
    const resetLink = `${process.env.FRONT_END_APP_URL}/password_reset/${user.id}?token=${token}`;

    notification.emit('notification', {
      type: 'forgotPassword',
      payload: [{
        email,
        first_name: user.firstName,
        reset_link: resetLink,
      }],
    });

    return response.status(200).json({
      status: 'success',
      message: 'reset-link sent successfully',
    });
  },

  resetPassword: async (request, response) => {
    const { id, token } = request.params;
    const { password } = request.body;

    const user = await User.findByPk(id);
    if (!user) throw new NotFoundError(`user with ${id} does not exist`);

    await user.decodeVerificationToken(token);
    await user.update({ password });

    return response.status(200).json({
      status: 'success',
      message: 'password updated successfully',
    });
  },

  changePassword: async (request, response) => {
    const { id } = request.user;
    const { oldPassword, newPassword } = request.body;

    const user = await User.findByPk(id);
    if (!user) throw new NotFoundError(`user with id ${id} does not exist`);

    const checkOldPassword = await user.validatePassword(oldPassword);
    if (!checkOldPassword) {
      throw new ApplicationError(400, 'the old password you entered is wrong');
    }

    const checkNewPassword = await user.validatePassword(newPassword);
    if (checkNewPassword) {
      throw new ApplicationError(400, "you can't use the old password again");
    }

    await user.update({ password: newPassword });

    return response.status(200).json({
      status: 'success',
      message: 'password update successful',
    });
  },
};
