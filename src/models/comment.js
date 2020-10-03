const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Comment, {
        foreignKey: {
          name: 'parentId',
          allowNull: true,
        }
      })
      this.hasMany(models.Comment, {
        foreignKey: 'parentId'
      })
    }
  }

  Comment.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    guestUserName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentId: {
      type: DataTypes.UUID,
      allownull: true,
      defaultValue: null,
    },
    storyId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    details: {
      type: DataTypes.STRING,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });

  return Comment;
};
