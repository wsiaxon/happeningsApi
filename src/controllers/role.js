const model = require('../models');
const { NotFoundError } = require('../helpers/error');
const paginator = require('../helpers/paginator');
const { getPermissions } = require('../models/enums');

const { Role } = model;

module.exports = {
  getAllRoles: async (request, response) => {
    const { skip = 1, limit = 10 } = request.query;

    const { data, count } = await paginator(Role, { skip, limit });

    return response.status(200).json({
      status: 'success',
      data: data,
      count,
      skip: +skip,
      limit: +limit,
    });
  },

  getPagedRoles: async (request, response) => {
    const { skip = 1, limit = 10 } = request.query;

    const { data, count } = await paginator(Role, { skip, limit });

    return response.status(200).json({
      status: 'success',
      data: data,
      count,
      skip: +skip,
      limit: +limit,
    });
  },
  
  getRoleById: async (request, response) => {
    const { id } = request.params;

    const role = await Role.findByPk(id);

    if (!role) throw new NotFoundError(`role with id ${id} doesn't exist`);

    return response.status(200).json({
      status: 'success',
      data: role.toJSON(),
    });
  },
  
  /**
   * @function createRole
   * @description controller for creating a role
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} callback that executes the controller
   */
  createRole: async (request, response) => {
    const { permissions, ...role } = {
      ...request.body,
    };
    var grantedPermissions = [];
    permissions.forEach(p => {
      grantedPermissions.push(...getPermissions(p));
    })

    role.grantedPermissions = grantedPermissions;
    const roleResponse = await Role.create(role);

    return response.status(201).json({
      status: 'success',
      message: 'Role successfully created',
      data: roleResponse,
    });
  },

};
