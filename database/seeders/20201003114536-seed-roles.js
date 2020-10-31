const { getPermissions } = require("../../src/models/enums");

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Roles', [
    {
      id: 1,
      name: 'Admin',
      description: 'The super admin role',
      grantedPermissions: [
        ...getPermissions("User"),
        ...getPermissions("Role"),
        ...getPermissions("Category"),
        ...getPermissions("Tag"),
        ...getPermissions("Image"),
        ...getPermissions("Story.Read"),
        ...getPermissions("Story.Update"),
        ...getPermissions("Story.Delete")
      ],
      isDeleted: false,
      createdAt: new Date(),
    },
  ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Roles', null, {}),
};
