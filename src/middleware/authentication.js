const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
const { ApplicationError } = require('../helpers/error');
const { User } = require('../models');

config();

module.exports = {
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
};
