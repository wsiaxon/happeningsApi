const { Channel } = require("./enums");


module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define(
    'Story',
    {
      channel: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: Channel.BLOG
      },
      type: {
        type: DataTypes.STRING,
      },
      categories: {
        type: DataTypes.ARRAY,
        allowNull: false,
      },
      tags: {
        type: DataTypes.ARRAY,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      subTitle: {
        type: DataTypes.STRING,
      },
      author: {
        type: DataTypes.STRING,
      },
      guestAuthor: {
        type: DataTypes.STRING,
      },
      bannerImageId: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date(),
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
  );
  Story.associate = function (models) {
    // associations can be defined here
  };
  return Story;
};
