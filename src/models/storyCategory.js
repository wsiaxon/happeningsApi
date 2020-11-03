const { Model } = require('sequelize');
const Story = require('./story');
const Category = require('./category');

module.exports = (sequelize, DataTypes) => {
  class StoryCategory extends Model {
    static associate(models) {
    }
  }

  StoryCategory.init({
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    storyId: {
      type: DataTypes.UUID,
      references: {
        model: Story, 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'StoryCategory',
  });

  return StoryCategory;
};
