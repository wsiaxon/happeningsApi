const model = require('../models');
const { NotFoundError } = require('../helpers/error');
const paginator = require('../helpers/paginator');

const { Comment } = model;

module.exports = {
  getAllComments: async (request, response) => {
    const { page = 1, limit = 10 } = request.query;

    const { data, count } = await paginator(Comment, { page, limit });

    return response.status(200).json({
      status: 'success',
      data: data,
      count,
      page: +page,
      limit: +limit,
    });
  },

  getOneComment: async (request, response) => {
    const { commentId } = request.params;

    const comment = await Comment.findByPk(commentId);

    if (!comment) throw new NotFoundError(`comment with id ${commentId} doesn't exist`);

    return response.status(200).json({
      status: 'success',
      data: comment.toJSON(),
    });
  },
};
