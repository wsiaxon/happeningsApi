const { Model } = require('sequelize');
// const StoryTag = require('./storyTag');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      this.belongsToMany(models.Story, {
        as: 'StoryTags',
        through: models.StoryTag,
        foreignKey: 'storyId',
        otherKey: 'tagId',
      });
    }
  }

  Tag.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Tag',
  });

  return Tag;
};
