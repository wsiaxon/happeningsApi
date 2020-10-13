const { check } = require('express-validator');

module.exports = {
  createTagSchema: [
    check('name')
      .exists()
      .trim()
      .withMessage('name of the comment is required')
      .matches(/[a-zA-Z]{2,}/)
      .withMessage('tag name must contain at least a 2 letter word'),
  ],

  editTagSchema: [
    check('name')
      .optional()
      .trim()
      .matches(/[a-zA-Z]{2,}/)
      .withMessage('tag name must contain at least a 2 letter word'),
  ],
};
