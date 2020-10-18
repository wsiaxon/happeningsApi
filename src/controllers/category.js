const model = require('../models');
const { NotFoundError } = require('../helpers/error');
const paginator = require('../helpers/paginator');

const { Category } = model;

module.exports = {
  getAllCategories: async (request, response) => {

    const categories = await Category.findAll();

    const message = categories.length
      ? `categor${categories.length > 1 ? 'ies' : 'y'} successfully retrieved`
      : 'no categories found in the database';

    return response.status(200).json({
      status: 'success',
      message,
      data: categories
    });
  },

  getPagedCategories: async (request, response) => {
    const { skip = 1, limit = 10 } = request.query;

    const { data, count } = await paginator(Category, { skip, limit });

    return response.status(200).json({
      status: 'success',
      data: data,
      count,
      skip: +skip,
      limit: +limit,
    });
  },

  getCategoryById: async (request, response) => {
    const { id } = request.params;

    const category = await Category.findByPk(id);

    if (!category) throw new NotFoundError(`category with id ${id} doesn't exist`);

    return response.status(200).json({
      status: 'success',
      data: category.toJSON(),
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
      data: categoryResponse,
    });
  },

};
