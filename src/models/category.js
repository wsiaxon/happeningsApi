const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.belongsToMany(models.Story, {
        through: 'StoryCategory',
        foreignKey: 'storyId',
        otherKey: 'categoryId'
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
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
