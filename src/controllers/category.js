const model = require('../models');
const { NotFoundError } = require('../helpers/error');
const paginator = require('../helpers/paginator');

const { Category } = model;

export default {
  getAllCategories: async (request, response) => {
    const { page = 1, limit = 10 } = request.query;

    const { data, count } = await paginator(Category, { page, limit });

    return response.status(200).json({
      status: 'success',
      data: data,
      count,
      page: +page,
      limit: +limit,
    });
  },

  getOneCategory: async (request, response) => {
    const { categoryId } = request.params;

    const category = await Category.findByPk(categoryId);

    if (!category) throw new NotFoundError(`category with id ${categoryId} doesn't exist`);

    return response.status(200).json({
      status: 'success',
      data: category.toJSON(),
    });
  },
};
