const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
const { ApplicationError } = require('../helpers/error');
const { User, Story } = require('../models');

config();

module.exports = {
  checkToken: (request, response, next) => {
    const authHeader = request.headers.authorization;
    if(!authHeader) return next();

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
      if (error) return next();

      const { id } = decodedToken;

      request.userId = id;

      return next();
    });
  },
  /**
   * @param {Object} request express request object
   * @param {Object} response express response object
   * @param {Function} next callback to call next middleware
   *
   * @returns {Object} response from the server
   */
  verifyToken: (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) return next(new ApplicationError(401, 'Authorization has been denied'));

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
      console.log(decodedToken)
      if (error) return next(new ApplicationError(401, `${error.message}`));

      const { id } = decodedToken;
      const user = await User.findByPk(id);
      if (!user) return next(new ApplicationError(403, 'Invalid user credentials'));

      request.user = user;

      return next();
    });
  },

  /**
   * @function permit
   * @description middleware for authorizing user based on roles
   *
   * @param {Array} permitted array of roles
   *
   * @returns null
   */
  permit: (...permitted) => (request, response, next) => {
    if (permitted.indexOf(request.role) !== -1) return next();
    throw new ApplicationError(403, 'access denied');
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
   * @function isAuthor
   * @description Checks if user is the author of the article
   *
   * @param {Object} request - the request object to the server
   * @param {Object} response - express response object
   * @param {Function} next
   *
   * @returns {void} - passes control to the next middleware
   */
  isAuthor: async (request, response, next) => {
    const { id } = request.user;
    const { slug } = request.params;

    const storyResponse = await Story.findOneStory(slug);
    request.storyInstance = storyResponse;

    if (!storyResponse) throw new ApplicationError(404, 'story not found');
    if (storyResponse.authorId !== id) {
      throw new ApplicationError(403, 'unauthorized access. for author only');
    }
    next();
  },
};
