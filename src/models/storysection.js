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
      type: DataTypes.NUMBER,
      allowNull: false,
      unique: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
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
