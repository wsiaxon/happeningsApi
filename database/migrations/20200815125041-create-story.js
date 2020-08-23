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
      categories: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
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
      author: {
        type: Sequelize.STRING,
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
