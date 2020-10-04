module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"',
    );

    await queryInterface.createTable('StoryTags', {
      storyId: {
        type: Sequelize.UUID,
        references: {
          model: 'Stories', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('StoryTags');
  },
};
