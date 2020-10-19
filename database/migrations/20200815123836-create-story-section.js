const { StorySectionType } = require("../../src/models/enums");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StorySections', {
      id: {
        // allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
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
      index: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      contents: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM(Object.values(StorySectionType)),
        allowNull: false,
        defaultValue: StorySectionType.Text,
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
    await queryInterface.dropTable('StorySections');
  },
};
