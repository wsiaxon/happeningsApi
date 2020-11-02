const { check } = require('express-validator');

module.exports = {
  createRoleSchema: [
    check('name')
      .exists()
      .trim()
      .withMessage('Name of the Role is required')
      .matches(/[a-zA-Z]{3,}/)
      .withMessage('Name must contain at least a 3 letters'),

    check('grantedPermissions')
      .isArray({ min: 1})
      .withMessage('Role must have at least one permission'),
  ],

  editRoleSchema: [
    check('name')
      .optional()
      .trim()
      .matches(/[a-zA-Z]{3,}/)
      .withMessage('Role name must contain at least a 3 letters'),

    check('grantedPermissions')
      .isArray({ min: 1})
      .withMessage('Role must have at least one permission'),
  ],
};
