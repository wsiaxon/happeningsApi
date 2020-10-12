const model = require('../models');
const { NotFoundError } = require('../helpers/error');
const paginator = require('../helpers/paginator');

const { User } = model;

module.exports = {
  getAllUsers: async (request, response) => {
    const { page = 1, limit = 10 } = request.query;

    const { data, count } = await paginator(User, { page, limit });

    return response.status(200).json({
      status: 'success',
      data: JSON.parse(JSON.stringify(data)).map((item) => {
        const { password, ...dataValues } = item;
        return dataValues;
      }),
      count,
      page: +page,
      limit: +limit,
    });
  },

  getOneUser: async (request, response) => {
    const { userId } = request.params;

    const user = await User.findByPk(userId);

    if (!user) throw new NotFoundError(`user with id ${userId} doesn't exist`);

    return response.status(200).json({
      status: 'success',
      data: user.toJSON(),
    });
  },
};
