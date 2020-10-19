const model = require('../models');
const { NotFoundError, ApplicationError } = require('../helpers/error');
const paginator = require('../helpers/paginator');
const error = require('../helpers/error');

const { Tag } = model;

module.exports = {
  getAllTags: async (request, response) => {
    const { skip = 0, limit = 10 } = request.query;

    const { data, count } = await paginator(Tag, { skip, limit });

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

  getPagedTags: async (request, response) => {
    const { skip = 1, limit = 10 } = request.query;

    const { data, count } = await paginator(Tag, { skip, limit });

    return response.status(200).json({
      status: 'success',
      result: data,
      count,
      skip: +skip,
      limit: +limit,
    });
  },
  
  getTagById: async (request, response) => {
    const { id } = request.params;

    const tag = await Tag.findByPk(id);

    if (!tag) throw new NotFoundError(`tag with id ${id} doesn't exist`);

    return response.status(200).json({
      status: 'success',
      result: tag.toJSON(),
    });
  },
  
  /**
   * @function createTag
   * @description controller for creating a tag
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} callback that executes the controller
   */
  createTag: async (request, response) => {
    const tag = {
      ...request.body,
    };

    const tagResponse = await Tag.create(tag);

    return response.status(201).json({
      status: 'success',
      message: 'Tag successfully created',
      result: tagResponse,
    });
  },

  /**
   * @function editTag
   * @description controller for editing a tag
   *
   * @todo check model, middleware and controller✅
   * @todo add more validation
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} callback that executes the controller
   */
  editTag: async (request, response) => {
    const { id, name } = request.body;
    const { requestId } = request.params;
    if(id !== parseInt(requestId))
      throw new ApplicationError(400, "Id parameters do not match")

    const tagResponse = await Tag.updateTag(request.body);

    return response.status(200).json({
      status: 'success',
      message: 'story successfully updated',
      result: tagResponse.dataValues,
    });
  },
};
