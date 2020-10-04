module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Categories', [
    {
      id: 1,
      name: 'Entertainment',
      slug: 'entertainment',
      parentId: null,
      isDeleted: false,
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Travel',
      slug: 'travel',
      parentId: null,
      isDeleted: false,
      createdAt: new Date(),
    },
    {
      id: 3,
      name: 'Sport',
      slug: 'sport',
      parentId: null,
      isDeleted: false,
      createdAt: new Date(),
    },
    {
      id: 4,
      name: 'Politics',
      slug: 'politics',
      parentId: null,
      isDeleted: false,
      createdAt: new Date(),
    },
    {
      id: 5,
      name: 'Football',
      slug: 'football',
      parentId: 3,
      isDeleted: false,
      createdAt: new Date(),
    },
  ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Categories', null, {}),
};
