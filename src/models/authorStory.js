const { Model } = require('sequelize');
const Story = require('./story');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  class AuthorStory extends Model {
    static associate(models) {
    }
  }

  AuthorStory.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
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
    modelName: 'AuthorStory',
  });

  return AuthorStory;
};
