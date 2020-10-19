const { check } = require('express-validator');

module.exports = {
  createCategorySchema: [
    check('title')
      .exists()
      .trim()
      .withMessage('name of the category is required')
      .matches(/[a-zA-Z]{3,}/)
      .withMessage('name must contain at least a 3 letter word'),

    check('parentId')
      .optional()
      .isNumeric({ min: 0})
      .withMessage('parent Id cannot be less than 0'),
  ],

  editCategorySchema: [
    check('title')
      .optional()
      .trim()
      .matches(/[a-zA-Z]{3,}/)
      .withMessage('story title must contain at least a 3 letter word'),

    check('parentId')
      .optional()
      .isNumeric({ min: 0})
      .withMessage('parent Id cannot be less than 0'),
  ],
};
