const model = require('../models');
const { NotFoundError } = require('../helpers/error');
const paginator = require('../helpers/paginator');

const { Category } = model;

module.exports = {
  getAllCategories: async (request, response) => {
    const { skip = 0, limit = 10 } = request.query;
    const { data, count } = await paginator(Category, { skip, limit });

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

  getCategoryById: async (request, response) => {
    const { id } = request.params;

    const category = await Category.findByPk(id);

    if (!category) throw new NotFoundError(`category with id ${id} doesn't exist`);

    return response.status(200).json({
      status: 'success',
      result: category.toJSON(),
    });
  },
  
  /**
   * @function createCategory
   * @description controller for creating a category
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} callback that executes the controller
   */
  createCategory: async (request, response) => {
    const category = {
      ...request.body,
    };
    category.slug = slugify(`${request.body.name} ${(category.parentId || '')}`);

    const categoryResponse = await Category.create(category);

    return response.status(201).json({
      status: 'success',
      message: 'Category successfully created',
      result: categoryResponse,
    });
  },

};
