const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.belongsToMany(models.Story, {
        as: 'story',
        through: 'StoryCategories',
        foreignKey: 'storyId',
        otherKey: 'categoryId'
      });
    }
  }

  Category.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    parent: {
      type: DataTypes.NUMBER,
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
