const { check } = require('express-validator');

module.exports = {
  signupSchema: [
    check('firstName')
      .not()
      .isEmpty()
      .withMessage('your firstName is required'),

    check('lastName')
      .not()
      .isEmpty()
      .withMessage('your lastName is required'),

    check('email')
      .not()
      .isEmpty()
      .withMessage('email address is required')
      .isEmail()
      .withMessage('enter a valid email address')
      .normalizeEmail(),

    check('password')
      .not()
      .isEmpty()
      .withMessage('password is required'),
  ],

  signinSchema: [
    check('usernameOrEmail')
      .not()
      .isEmpty()
      .withMessage('username or email is required'),

    check('password')
      .not()
      .isEmpty()
      .withMessage('password is required'),
  ],

  socialLoginSchema: [
    check('provider')
      .trim()
      .exists()
      .withMessage('provider parameter is required')
      .isIn(['facebook', 'google'])
      .withMessage('enter a valid provider name'),

    check('accessToken')
      .trim()
      .exists()
      .withMessage('access token is required'),
  ],

  changePasswordSchema: [
    check('oldPassword')
      .trim()
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('enter your old password')
      .isLength({ min: 8 })
      .withMessage('old password should not be less than 8 characters'),

    check('newPassword')
      .trim()
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('enter your new password')
      .isLength({ min: 8 })
      .withMessage('new password should not be less than 8 characters'),
  ],

  emailSchema: [
    check('email')
      .not()
      .isEmpty()
      .withMessage('email address is required')
      .isEmail()
      .withMessage('enter a valid email address')
      .normalizeEmail(),
  ],

  passwordSchema: [
    check('password')
      .not()
      .isEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8, max: 15 })
      .withMessage('Password should be between 8 to 15 characters'),
  ],
};
