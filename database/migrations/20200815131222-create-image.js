module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      caption: {
        type: Sequelize.STRING,
      },
      attribute: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.STRING,
      },
      dimensions: {
        type: Sequelize.STRING,
      },
      isDeleted: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Images');
  },
};
