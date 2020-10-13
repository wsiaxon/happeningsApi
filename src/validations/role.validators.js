const { check } = require('express-validator');

module.exports = {
  createRoleSchema: [
    check('name')
      .exists()
      .trim()
      .withMessage('name of the comment is required')
      .matches(/[a-zA-Z]{3,}/)
      .withMessage('name must contain at least a 3 letter word'),

    check('permissions')
      .isArray({ min: 1})
      .withMessage('Role must have at least one permission'),
  ],

  editRoleSchema: [
    check('name')
      .optional()
      .trim()
      .matches(/[a-zA-Z]{3,}/)
      .withMessage('Role name must contain at least a 3 letter word'),

      check('permissions')
      .isArray({ min: 1})
      .withMessage('Role must have at least one permission'),
  ],
};
