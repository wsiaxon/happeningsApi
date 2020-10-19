const model = require('../models');
const { NotFoundError } = require('../helpers/error');
const paginator = require('../helpers/paginator');

const { Comment } = model;

module.exports = {
  getAllComments: async (request, response) => {
    const { skip = 0, limit = 10 } = request.query;

    const { data, count } = await paginator(Comment, { skip, limit });

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

  getPagedComments: async (request, response) => {
    const { skip = 1, limit = 10 } = request.query;

    const { data, count } = await paginator(Comment, { skip, limit });

    return response.status(200).json({
      status: 'success',
      result: data,
      count,
      skip: +skip,
      limit: +limit,
    });
  },
  
  getCommentById: async (request, response) => {
    const { id } = request.params;

    const comment = await Comment.findByPk(id);

    if (!comment) throw new NotFoundError(`comment with id ${id} doesn't exist`);

    return response.status(200).json({
      status: 'success',
      result: comment.toJSON(),
    });
  },
  
  /**
   * @function createComment
   * @description controller for creating a comment
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} callback that executes the controller
   */
  createComment: async (request, response) => {
    const comment = {
      ...request.body,
    };
    comment.slug = slugify(`${request.body.name}${(' '+comment.parentId || '')}`);

    const commentResponse = await Comment.create(comment);

    return response.status(201).json({
      status: 'success',
      message: 'Comment successfully created',
      result: commentResponse,
    });
  },

};
