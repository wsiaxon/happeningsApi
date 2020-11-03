const model = require('../models');
const { NotFoundError } = require('../helpers/error');
const paginator = require('../helpers/paginator');
const { getPermissions, getAllPermissions } = require('../models/enums');

const { Role } = model;

module.exports = {
  getAllPermissions: async (request, response) => {

    return response.status(200).json({
      status: 'success',
      result: getAllPermissions().map(x => { return { name: x} })
    });
  },

  getAllRoles: async (request, response) => {
    const { skip = 0, limit = 10 } = request.query;

    const { data, count } = await paginator(Role, { skip, limit });

    return response.status(200).json({
      status: 'success',
      result: {
        items: data,
        totalCount: count,
        skip: +skip,
        limit: +limit,
      }
    });
  },

  getRoleForEditById: async (request, response) => {
    const { id } = request.params;

    const role = await Role.findByPk(id);

    if (!role) throw new NotFoundError(`role with id ${id} doesn't exist`);

    var permissions = getAllPermissions();

    return response.status(200).json({
      status: 'success',
      result: {
        role,
        permissions,
        grantedPermissionNames: role.grantedPermissions
      }
    });
  },
  
  getRoleById: async (request, response) => {
    const { id } = request.params;

    const role = await Role.findByPk(id);

    if (!role) throw new NotFoundError(`role with id ${id} doesn't exist`);

    return response.status(200).json({
      status: 'success',
      result: role,
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
    const role = {
      ...request.body,
    };

    const roleResponse = await Role.create(role);

    return response.status(201).json({
      status: 'success',
      message: 'Role successfully created',
      result: roleResponse,
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
  updateRole: async (request, response) => {
    const role = {
      ...request.body,
    };

    const roleResponse = await Role.update(role, { where: { id: role.id }});

    return response.status(201).json({
      status: 'success',
      message: 'Role successfully updated',
      result: roleResponse,
    });
  },

};
