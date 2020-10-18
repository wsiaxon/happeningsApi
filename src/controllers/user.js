const models = require('../models');
const { NotFoundError } = require('../helpers/error');
const paginator = require('../helpers/paginator');

const { User, Role, Story } = models;

module.exports = {
  getAllUsers: async (request, response) => {
    const { page = 1, limit = 10 } = request.query;

    const { data, count } = await paginator(User, { page, limit, include: [{ model: Role, attributes: [] }] });

    return response.status(200).json({
      status: 'success',
      data: data.map((item) => {
        const { password, ...dataValues } = item;
        return dataValues;
      }),
      count,
      page: +page,
      limit: +limit,
    });
  },

  getPagedUsers: async (request, response) => {
    const { page = 1, limit = 10 } = request.query;

    const { data, count } = await paginator(User, { page, limit, include: [{ model: Role, attributes: [] }] });

    return response.status(200).json({
      status: 'success',
      data: data.map((item) => {
        const { password, ...dataValues } = item;
        return dataValues;
      }),
      count,
      page: +page,
      limit: +limit,
    });
  },
  
  getUserById: async (request, response) => {
    const { id } = request.params;

    const user = await User.findByPk(id, { include: [{ model: Role, attributes: [] },{ model: Story, attributes: [] }] });

    if (!user) throw new NotFoundError(`user with id ${id} doesn't exist`);

    return response.status(200).json({
      status: 'success',
      data: user,
    });
  },
  
  /**
   * @function createUser
   * @description controller for creating a user
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} callback that executes the controller
   */
  createUser: async (request, response) => {
    const user = {
      ...request.body,
    };

    const userResponse = await User.create(user);

    return response.status(201).json({
      status: 'success',
      message: 'User successfully created',
      data: userResponse,
    });
  },

};
