const { check } = require('express-validator');

module.exports = {
  createPermissionGroupSchema: [
    check('name')
      .exists()
      .trim()
      .withMessage('name of the comment is required')
      .matches(/[a-zA-Z]{3,}/)
      .withMessage('name must contain at least a 3 letter word'),

    check('permissions')
      .isArray({ min: 2})
      .withMessage('Permission Group must have at least one permission'),
  ],

  editPermissionGroupSchema: [
    check('name')
      .optional()
      .trim()
      .matches(/[a-zA-Z]{3,}/)
      .withMessage('name must contain at least a 3 letter word'),

      check('permissions')
      .isArray({ min: 2})
      .withMessage('Permission Group must have at least one permission'),
  ],
};
