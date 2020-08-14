

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      caption: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      attribute: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.NUMBER,
      },
      dimensions: {
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
  );
  Image.associate = function (models) {
    // associations can be defined here
  };
  return Image;
};
