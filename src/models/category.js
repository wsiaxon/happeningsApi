

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
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
    },
  );
  Category.associate = function (models) {
    // associations can be defined here
  };
  return Category;
};
