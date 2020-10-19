const { check } = require('express-validator');

module.exports = {
  createUserSchema: [
    check('name')
      .exists()
      .trim()
      .withMessage('name is required')
      .matches(/[a-zA-Z\-]/)
      .withMessage("name may contain only letters and '-'")
      .isLength({ min: 5, max: 50 })
      .withMessage('name should be between 5 to 50 characters'),

    check('username')
      .exists()
      .trim()
      .withMessage('username is required')
      .matches(/[a-zA-Z0-9]{5,}/)
      .withMessage('username may only be alphanumeric')
      .isLength({ min: 5, max: 50 })
      .withMessage('username should be between 5 to 50 characters'),

    check('email')
      .trim()
      .exists()
      .withMessage('email is required')
      .isEmail()
      .withMessage('the email field does not contain a valid email')
      .isLength({ min: 5, max: 1024 })
      .withMessage('user body should be between 50 to 1024 characters'),

    check('bio')
      .optional(),

    check('password')
      .exists()
      .trim()
      .isString(),
      
    check('gender')
    .optional()
    .matches(/^(Male|Female)$/)
    .withMessage('Gender must be either "Male" or "Female"'),

    check('isAdmin')
      .optional()
      .isBoolean(),
  ],

  getAllUsersSchema: [
    check('status')
      .optional()
      .isIn(['open', 'submitted', 'approved', 'published', 'rejected', 'scheduled'])
      .withMessage("invalid 'status' value. expected: 'open', 'submitted', 'approved', 'published', 'rejected', 'scheduled'"),
  ],

  editUserSchema: [
    check('name')
      .exists()
      .trim()
      .withMessage('name is required')
      .matches(/[a-zA-Z\-]/)
      .withMessage("name may contain only letters and '-'")
      .isLength({ min: 5, max: 50 })
      .withMessage('name should be between 5 to 50 characters'),

    check('username')
      .exists()
      .trim()
      .withMessage('username is required')
      .matches(/[a-zA-Z0-9]{5,}/)
      .withMessage('username may only be alphanumeric')
      .isLength({ min: 5, max: 50 })
      .withMessage('username should be between 5 to 50 characters'),

    check('email')
      .trim()
      .exists()
      .withMessage('email is required')
      .isEmail()
      .withMessage('the email field does not contain a valid email')
      .isLength({ min: 5, max: 1024 })
      .withMessage('user body should be between 50 to 1024 characters'),

    check('bio')
      .optional(),

    check('password')
      .exists()
      .trim()
      .isString(),
      
    check('gender')
    .optional()
    .matches(/^(Male|Female)$/)
    .withMessage('Gender must be either "Male" or "Female"'),

    check('isAdmin')
      .optional()
      .isBoolean(),
  ],
};
