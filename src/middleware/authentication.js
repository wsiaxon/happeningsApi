const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
const { ApplicationError } = require('../helpers/error');
const { User } = require('../models');

config();

module.exports = {
  /**
   * @param {Object} request express request object
   * @param {Object} response express response object
   * @param {Function} next callback to call next middleware
   *
   * @returns {Object} response from the server
   */
  verifyToken: (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new ApplicationError(412, 'authorization header not set');

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
      if (error) return next(new ApplicationError(401, `${error.message}`));

      const { id } = decodedToken;
      const user = await User.findByPk(id);
      if (!user) return next(new ApplicationError(403, 'invalid user credentials'));

      request.user = user;

      return next();
    });
  },

  /**
   * @description checks if user is an admin
   *
   * @param {Object} request express request object
   * @param {Object} response express response object
   * @param {Function} callback to next middleware
   *
   * @returns {Object}
   */
  isAdmin: (request, response, next) => {
    const { isAdmin } = request.user;
    if (!isAdmin) {
      throw new ApplicationError(403, 'unauthorized. for admin account only');
    }
    next();
  },

  /**
   * @description
   *
   * @param {Array}
   *
   * @returns null
   */
  permit: (...permitted) => (request, response, next) => {
    if (permitted.indexOf(request.role) !== -1) return next();
    throw new ApplicationError(403, 'access denied');
  },
};
