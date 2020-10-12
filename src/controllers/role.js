const model = require('../models');
const { NotFoundError } = require('../helpers/error');
const paginator = require('../helpers/paginator');

const { Role } = model;

module.exports = {
  getAllRoles: async (request, response) => {
    const { page = 1, limit = 10 } = request.query;

    const { data, count } = await paginator(Role, { page, limit });

    return response.status(200).json({
      status: 'success',
      data: data,
      count,
      page: +page,
      limit: +limit,
    });
  },

  getOneRole: async (request, response) => {
    const { roleId } = request.params;

    const role = await Role.findByPk(roleId);

    if (!role) throw new NotFoundError(`role with id ${roleId} doesn't exist`);

    return response.status(200).json({
      status: 'success',
      data: role.toJSON(),
    });
  },
};
