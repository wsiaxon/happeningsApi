// const { Model } = require('sequelize');
// const User = require('./user');
// const Role = require('./role');

// module.exports = (sequelize, DataTypes) => {
//   class UserRole extends Model {
//     static associate(models) {
//       // this.belongsToMany(models.User, {
//       //   through: 'UserRole'
//       // });
//     }
//   }

//   UserRole.init({
//     userId: {
//       type: DataTypes.UUID,
//       references: {
//         model: User, // 'Movies' would also work
//         key: 'id'
//       }
//     },
//     roleId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Role, // 'Actors' would also work
//         key: 'id'
//       }
//     }
//   }, {
//     sequelize,
//     modelName: 'UserRole',
//   });

//   return UserRole;
// };
