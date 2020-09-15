module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"',
    );

    await queryInterface.createTable('Stories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      channel: {
        type: Sequelize.ENUM('BLOG', 'TV', 'RADIO'),
        allowNull: false,
        defaultValue: 'BLOG',
      },
      type: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      subTitle: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      authorId: {
        type: Sequelize.UUID,
      },
      guestAuthor: {
        type: Sequelize.STRING,
      },
      bannerImageId: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Stories');
  },
};
