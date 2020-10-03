module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.sequelize.query(
    //   'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"',
    // );

    await queryInterface.createTable('GuestAuthorStories', {
      storyId: {
        type: Sequelize.UUID,
        references: {
          model: 'Stories', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('GuestAuthorStories');
  },
};
