const { Model } = require('sequelize');
const { StorySectionType } = require('./enums');

module.exports = (sequelize, DataTypes) => {
  class StorySection extends Model {
    static associate(models) {
      // define association here
    }
  }

  StorySection.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    storyId: {
      type: DataTypes.UUID,
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    contents: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.ENUM(Object.values(StorySectionType)),
      allowNull: false,
      defaultValue: StorySectionType.Text,
    },
  }, {
    sequelize,
    modelName: 'StorySection',
  });

  return StorySection;
};
