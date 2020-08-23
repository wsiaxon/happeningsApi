const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PermissionGroup extends Model {
    static associate(models) {
      // define association here
    }
  }

  PermissionGroup.init({
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
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'PermissionGroup',
  });

  return PermissionGroup;
};
