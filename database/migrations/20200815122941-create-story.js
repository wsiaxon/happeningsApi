const { StoryChannel, StoryStatus, StoryType } = require("../../src/models/enums");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"',
    );

    await queryInterface.createTable('Stories', {
      id: {
        // allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      channel: {
        type: Sequelize.ENUM(Object.values(StoryChannel)),
        allowNull: false,
        defaultValue: StoryChannel.Blog,
      },
      type: {
        type: Sequelize.ENUM(Object.values(StoryType)),
      },
      slug: {
        type: Sequelize.STRING,
      },
      headline: {
        type: Sequelize.STRING,
      },
      subHeadline: {
        type: Sequelize.STRING,
      },
      summary: {
        type: Sequelize.STRING,
      },
      // content: {
      //   type: Sequelize.TEXT,
      // },
      // authorId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'Users', // name of Target model
      //     key: 'id', // key in Target model that we're referencing
      //   },
      // },
      // guestAuthors: {
      //   type: Sequelize.ARRAY(Sequelize.STRING),
      // },
      bannerImageUrl: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(Object.values(StoryStatus)),
        allowNull: false,
        defaultValue: StoryStatus.Open,
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
    await queryInterface.dropTable('Stories');
  },
};
