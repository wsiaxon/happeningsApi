const { Gender } = require("../../src/models/enums");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // let transaction = await queryInterface.sequelize.transaction();
    await queryInterface.createTable('Users',{
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bio: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM(Object.values(Gender)),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
      },
      profilePic: {
        type: Sequelize.STRING,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
      },
      emailVerificationToken: {
        type: Sequelize.STRING,
      },
      emailTokenExpiryDate: {
        type: Sequelize.DATE,
      },
      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isLockedOut: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      failedCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      lockEndDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('Users');
  },
};
