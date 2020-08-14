

module.exports = (sequelize, DataTypes) => {
  const PermissionGroup = sequelize.define(
    'PermissionGroup',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.ARRAY,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
  );
  PermissionGroup.associate = function (models) {
    // associations can be defined here
  };
  return PermissionGroup;
};
