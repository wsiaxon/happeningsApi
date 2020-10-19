const { check } = require('express-validator');

module.exports = {
  createCommentSchema: [
    check('contents')
      .exists()
      .trim()
      .withMessage('contents of the comment is required')
      .matches(/[a-zA-Z]{3,}/)
      .withMessage('contents must contain at least a 3 characters'),

    check('guestUserName')
      .optional()
      .isString()
      .trim(),

    check('parentId')
      .optional()
      .isNumeric({ min: 0})
      .withMessage('parent Id cannot be less than 0'),
  ],

  editCommentSchema: [
    check('contents')
      .exists()
      .trim()
      .withMessage('contents of the comment is required')
      .matches(/[a-zA-Z]{3,}/)
      .withMessage('contents must contain at least a 3 characters'),

      check('storyId')
      .optional()
      .trim(),

      check('parentId')
        .optional()
        .trim()
        .isNumeric({ min: 0})
        .withMessage('parent Id cannot be less than 0'),
  ],
};
