module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        // allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      parentId: {
        type: Sequelize.UUID,
        references: {
          model: 'Comments', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      storyId: {
        type: Sequelize.UUID,
        references: {
          model: 'Stories', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      guestUserName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contents: {
        type: Sequelize.TEXT,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Comments');
  },
};
