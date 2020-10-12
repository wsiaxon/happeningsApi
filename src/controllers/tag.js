const model = require('../models');
const { NotFoundError } = require('../helpers/error');
const paginator = require('../helpers/paginator');

const { Tag } = model;

export default {
  getAllTags: async (request, response) => {
    const { page = 1, limit = 10 } = request.query;

    const { data, count } = await paginator(Tag, { page, limit });

    return response.status(200).json({
      status: 'success',
      data: data,
      count,
      page: +page,
      limit: +limit,
    });
  },

  getOneTag: async (request, response) => {
    const { tagId } = request.params;

    const tag = await Tag.findByPk(tagId);

    if (!tag) throw new NotFoundError(`tag with id ${tagId} doesn't exist`);

    return response.status(200).json({
      status: 'success',
      data: tag.toJSON(),
    });
  },
};
