const { Model } = require('sequelize');
// const StoryCategory = require('./storyCategory');
// const StoryTag = require('./storyTag');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.belongsToMany(models.Story, {
        through: models.StoryCategory,
        foreignKey: 'categoryId',
        otherKey: 'storyId'
      });
      this.belongsToMany(models.Tag, {
        through: models.StoryTag,
        foreignKey: 'categoryId',
        otherKey: 'tagId'
      });
      this.belongsTo(models.Category, {
        foreignKey: {
          name: 'parentId',
          allowNull: true,
        }
      })
      this.hasMany(models.Category, {
        foreignKey: 'parentId'
      })
    }
  }

  Category.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Category',
  });

  // Category.checkTagsExistence = async (tag) => {
  //   const availableCategory = await Category.findAll({ where: { id: tag } });
  //   return availableCategory;
  // };

  return Category;
};
