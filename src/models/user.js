const bcrypt = require('bcryptjs');
const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');
const { verifyPassword, urlSafeRandomString } = require('../helpers/auth');

config();

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    profilePic: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verifyToken: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    expireVerifyToken: {
      type: DataTypes.DATE,
    },
    isVerified: {
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

    if (!users.verifyToken) {
      users.verifyToken = urlSafeRandomString({ length: 64 });
    }

    if (users.changed('verifyToken')) {
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 5);
      users.expireVerifyToken = expiryDate;
    }

    if (!users.expireVerifyToken) {
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 2);
      users.expireVerifyToken = expiryDate;
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
    const { password, ...safedata } = this.get();
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
  User.prototype.validatePassword = function validatePassword(password) {
    return verifyPassword(this.password, password);
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
