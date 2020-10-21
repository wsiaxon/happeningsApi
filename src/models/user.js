const bcrypt = require('bcryptjs');
const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');
const { urlSafeRandomString } = require('../helpers/auth');
const { Gender } = require('./enums');
// const UserRole = require('./userRole');
// const AuthorStory = require('./authorStory');

config();

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Story, {
        through: models.AuthorStory,
        foreignKey: 'userId',
        otherKey: 'storyId',
      });
      
      this.belongsToMany(models.Role, { through: models.UserRole, as: 'roles', foreignKey: 'userId', otherKey: 'roleId' });
    }
  }

  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
    },
    // phone: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    password: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.ENUM(Object.values(Gender)),
      allowNull: true,
    },
    profilePic: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('profilePic') || 'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png';
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    emailVerificationToken: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    emailTokenExpiryDate: {
      type: DataTypes.DATE,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isLockedOut: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    failedCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lockEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

  }, {
    sequelize,
    modelName: 'User',
  });

  /**
   * @method beforeCreate
   * @description
   */
  User.beforeCreate(async (users) => {
    users.password = await users.generatePasswordHash();

    if (!users.emailVerificationToken) {
      users.emailVerificationToken = urlSafeRandomString({ length: 64 });
    }

    if (users.changed('emailVerificationToken')) {
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 5);
      users.emailTokenExpiryDate = expiryDate;
    }

    if (!users.emailTokenExpiryDate) {
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 2);
      users.emailTokenExpiryDate = expiryDate;
    }
  });

  /**
   * @method beforeUpdate
   * @description
   */
  User.beforeUpdate(async (data) => {
    if (data.changed('password')) {
      data.password = await data.generatePasswordHash();
    }
  });

  /**
   * @method getExistingUser
   * @description
   *
   * @param {String} queryString
   * @param {String} column
   */
  User.getExistingUser = async (queryString, column = 'email') => {
    const data = await User.findOne({ where: { [column]: queryString } });
    return data;
  };

  /**
   * @function toJSON
   * @description
   */
  User.prototype.toJSON = function toJSON() {
    const {
      password, emailVerificationToken, emailTokenExpiryDate, ...safedata
    } = this.get();
    return safedata;
  };

  /**
   * @function generatePasswordHash
   * @description
   */
  User.prototype.generatePasswordHash = async function generatePasswordHash() {
    const password = await bcrypt.hash(this.password, +process.env.SALT_ROUNDS);
    return password;
  };

  /**
   * @function validatePassword
   * @description
   *
   * @param {String} password
   */
  User.prototype.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
  };

  /**
   * @description Generate verification token for a user
   * @memberof User
   *
   * @returns {string} user token
   */
  User.prototype.generateVerificationToken = function generateVerificationToken() {
    const secret = `${this.password}!${this.createdAt.toISOString()}`;
    return jwt.sign({ id: this.id }, secret, { expiresIn: '10m' });
  };

  /**
   * @description Decode verification token for a user
   * @memberof User
   *
   * @param {string} token
   *
   * @returns {string} decoded token
   */
  User.prototype.decodeVerificationToken = function decodeVerificationToken(token) {
    const secret = `${this.password}!${this.createdAt.toISOString()}`;
    return jwt.verify(token, secret);
  };

  return User;
};
