module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Categories', [
    {
      id: '842b0c1e-bd2b-4a4a-82e9-610869f02fd4',
      name: 'Travel',
      slug: 'travel',
      parent: 0,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '842b0c1e-bd2b-4a4a-82e9-610869f02fd5',
      name: 'Religion',
      slug: 'religion',
      parent: 0,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '842b0c1e-bd2b-4a4a-82e9-610869f02fd6',
      name: 'Politics',
      slug: 'politics',
      parent: 0,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Categories', null, {}),
};
