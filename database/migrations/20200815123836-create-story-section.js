module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StorySections', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      storyId: {
        type: Sequelize.UUID,
      },
      position: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM('TEXT', 'IMAGE'),
        allowNull: false,
        defaultValue: 'TEXT',
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
    await queryInterface.dropTable('StorySections');
  },
};
