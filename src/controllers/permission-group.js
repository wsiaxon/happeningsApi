const model = require('../models');
const { NotFoundError } = require('../helpers/error');
const paginator = require('../helpers/paginator');

const { PermissionGroup } = model;

module.exports = {
  getAllPermissionGroups: async (request, response) => {
    const { skip = 1, limit = 10 } = request.query;

    const { data, count } = await paginator(PermissionGroup, { skip, limit });

    return response.status(200).json({
      status: 'success',
      data: data,
      count,
      skip: +skip,
      limit: +limit,
    });
  },

  getPagedPermissionGroups: async (request, response) => {
    const { skip = 1, limit = 10 } = request.query;

    const { data, count } = await paginator(PermissionGroup, { skip, limit });

    return response.status(200).json({
      status: 'success',
      data: data,
      count,
      skip: +skip,
      limit: +limit,
    });
  },
  
  getPermissionGroupById: async (request, response) => {
    const { id } = request.params;

    const permissionGroup = await PermissionGroup.findByPk(id);

    if (!permissionGroup) throw new NotFoundError(`permissionGroup with id ${id} doesn't exist`);

    return response.status(200).json({
      status: 'success',
      data: permissionGroup.toJSON(),
    });
  },
  
  /**
   * @function createPermissionGroup
   * @description controller for creating a permissionGroup
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} callback that executes the controller
   */
  createPermissionGroup: async (request, response) => {
    const permissionGroup = {
      ...request.body,
    };

    const permissionGroupResponse = await PermissionGroup.create(permissionGroup);

    return response.status(201).json({
      status: 'success',
      message: 'PermissionGroup successfully created',
      data: permissionGroupResponse,
    });
  },

};
