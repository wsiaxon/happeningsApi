/**
 * @function paginator
 * @description implements pagination support
 * -> https://github.com/andela/vali-ah-backend/blob/develop/src/helpers/paginator.js
 *
 * @param {Object} Source - model Object
 * @param {Object} options
 *
 * @returns {Object}
 */
const paginator = async (Source, options) => {
  let data = [];
  const {
    page,
    limit,
    dataSource,
    dataToSource,
    ...otherOptions
  } = options;
  const offset = limit * (+page - 1);

  if (!Source) {
    const { data: result, count } = await dataSource({
      data: dataToSource,
      options: {
        limit,
        offset,
        ...otherOptions,
      },
    });
    return { data: result, count };
  }

  const result = await Source.findAndCountAll({ ...otherOptions,
    limit,
    offset,
    order: [['createdAt', 'DESC']] });
    console.log(result.rows[0].dataValues);

  return { data: result.rows.map(x => x.dataValues), count: result.count };
};

module.exports = paginator;
