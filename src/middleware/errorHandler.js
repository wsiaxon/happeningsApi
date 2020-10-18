const { config } = require('dotenv');
const debug = require('debug')('dev');

config();

/**
 * @function
 * @description a wrapper controller for error handling
 *
 * @param {Object} err error object
 * @param {Object} request express request object
 * @param {Object} response express response object
 * @param {Function} next callback to call next middleware
 *
 * @returns {Object} response from the server
 */
export default (err, request, response, next) => {
  const isProduction = process.env.NODE_ENV === 'production';
  let errorMessage = {};

  if (err.name === 'MulterError' && err.message === 'Unexpected field') {
    err.message = 'Photo should be added to the "avatar" field';
  }

  if (response.headersSent) {
    return next(err);
  }

  if (!isProduction) {
    debug(err.stack);
    errorMessage = err;
  }

  return response.status(err.statusCode || 500).json({
    result: undefined,
    status: 'error',
    error: {
      message: err.message,
      ...(err.errors && { errors: err.errors }),
      ...(!isProduction && { trace: errorMessage }),
    },
  });
};
