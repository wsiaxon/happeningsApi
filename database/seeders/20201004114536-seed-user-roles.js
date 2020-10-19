module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('UserRoles', [
    {
      roleId: 1,
      userId: 1,
      createdAt: new Date(),
    },
  ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('UserRoles', null, {}),
};
