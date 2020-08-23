const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
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
    },
    slug: {
      type: DataTypes.STRING,
    },
    parent: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Category',
  });

  return Category;
};
