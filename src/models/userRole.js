const { Model } = require('sequelize');
const Role = require('./role');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
    }
  }

  UserRole.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role, 
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'UserRole',
  });

  return UserRole;
};
