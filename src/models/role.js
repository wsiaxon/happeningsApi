const { Model } = require('sequelize');
// const UserRole = require('./userRole');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.belongsToMany(models.User, { through: models.UserRole, as: 'UserRoles', foreignKey: 'roleId', otherKey: 'userId' });
    }
  }

  Role.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    grantedPermissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Role',
  });

  return Role;
};
