const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    static associate(models) {
      // define association here
    }
  }

  Story.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    channel: {
      type: DataTypes.ENUM('BLOG', 'TV', 'RADIO'),
      allowNull: false,
      defaultValue: 'BLOG',
    },
    type: {
      type: DataTypes.STRING,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
      type: DataTypes.ENUM('draft', 'scheduled', 'pending', 'approved'),
      defaultValue: 'draft',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date(),
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Story',
  });

  return Story;
};
