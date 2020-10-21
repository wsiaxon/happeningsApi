const models = require('../models');
const { NotFoundError } = require('../helpers/error');
const paginator = require('../helpers/paginator');

const { User, Role, UserRole } = models;

module.exports = {
  getAllUsers: async (request, response) => {
    const { skip = 0, limit = 10 } = request.query;

    const { data, count } = await paginator(User, { skip, limit, include: [{ model: Role, as: 'roles', attributes: [] }] });

    return response.status(200).json({
      status: 'success',
      result: {
        items: data.map((item) => {
          const { password, ...dataValues } = item;
          return dataValues;
        }),
        totalCount: count,
        skip: +skip,
        limit: +limit,
      }
    });
  },
  
  getById: async (request, response) => {
    const { id } = request.params;

    const user = await User.findByPk(id, { include: [{ model: Role, as: 'roles' }], attributes: { exclude: [ {model:UserRole}]} });

    if (!user) throw new NotFoundError(`user with id ${id} doesn't exist`);
    let { password, roles, dataValues, ...others } = user;
    dataValues.roles = roles.map(r => { return { id: r.id, name: r.name } })
    dataValues.roleNames = roles.map(r => r.name )

    return response.status(200).json({
      status: 'success',
      result: dataValues,
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
      result: userResponse,
    });
  },

};
