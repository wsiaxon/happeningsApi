const { getPermissions } = require("../../src/models/enums");

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Roles', [
    {
      id: 1,
      name: 'Admin',
      grantedPermissions: [
        ...getPermissions("User"),
        ...getPermissions("Role"),
        ...getPermissions("Category"),
        ...getPermissions("Tag")
      ],
      isDeleted: false,
      createdAt: new Date(),
    },
  ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Roles', null, {}),
};
