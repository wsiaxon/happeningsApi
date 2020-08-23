const { Model } = require('sequelize');

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
    position: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('TEXT', 'IMAGE'),
      allowNull: false,
      defaultValue: 'TEXT',
    },
  }, {
    sequelize,
    modelName: 'StorySection',
  });

  return StorySection;
};
