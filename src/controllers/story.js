const { Sequelize, Op } = require('sequelize');
const { v4: uuid } = require('uuid');
const { ApplicationError } = require('../helpers/error');
const { User, Story, StoryCategories, Category } = require('../models');
const { slugify, getTagName } = require('../helpers/utils');
const paginator = require('../helpers/paginator');
const { StoryStatus } = require('../models/enums');

module.exports = {
  
  /**
   * @function getAllStories
   * @description controller for retrieving a story based on the status
   * of the story. Default is to retrieve all stories. Status includes:
   * - All, Open, Submitted, Approved, Published, Rejected, Scheduled
   *
   * @todo add pagination support for this controller
   * @todo clarify issue with permission
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} callback that executes the controller
   */
  getAllStories: async (request, response) => {
    const { status, keyword='', skip = 0, limit = 10 } = request.query;
    let isStatus = false;
    if(!!status){
      for(let stat in StoryStatus){
        if(status.toUpperCase() === StoryStatus[stat]){
          isStatus = true;
          break;
        }
      }
    }
    // if(!isStatus) throw new ApplicationError(400, "Invalid Status");

    let result;

    if (!isStatus) {
      result = await paginator(Story, { skip, limit, where: { title: {[Op.iLike]: `%${keyword}%`}}, include: [{ model: Category }] });
    }
    else {
      result = await paginator(Story, { skip, limit, where: { status: status.toUpperCase(), title: {[Op.iLike]: `%${keyword}%`} }, include: [{ model: Category, attributes: [] }] });
    }

    const message = result.data.length
      ? `stor${result.data.length > 1 ? 'ies' : 'y'} successfully retrieved`
      : 'no stories found in the database';

    return response.status(200).json({
      status: 'success',
      result: {
        items: result.data,
        totalCount: result.count,
        skip: +skip,
        limit: +limit,
      }
    });
  },

  getStatusCounts: async (request, response) => {
    // const { all, open, submitted, approved, published, rejected, scheduled } = request.query;

    const all = await Story.count();
    const open = await Story.count({ where: { status: 'OPEN'}});
    const submitted = await Story.count({ where: { status: 'SUBMITTED'}});
    const approved = await Story.count({ where: { status: 'APPROVED'}});
    const published = await Story.count({ where: { status: 'PUBLISHED'}});
    const rejected = await Story.count({ where: { status: 'REJECTED'}});
    const scheduled = await Story.count({ where: { status: 'SCHEDULED'}});

    return response.status(200).json({
      status: 'success',
      result: {
        all,
        open,
        submitted,
        approved,
        published,
        rejected,
        scheduled
      }
    });
  },

  /**
   * @function createStory
   * @description controller for creating a story
   *
   * @todo add categories and tags when creating a story✅
   * @todo implement model associations✅
   * @todo create seeders file for tags in the db✅
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} callback that executes the controller
   */
  createStory: async (request, response) => {
    const { categories } = request.body;
    const story = {
      ...request.body,
      id: uuid(),
      authorId: request.user.id,
    };
    story.slug = slugify(`${request.body.title} ${story.id}`);

    const storyResponse = await Story.create(story);
    const categoryResponse = categories
      ? await storyResponse.addCategory(categories)
      : [];
    // const tagName = await getTagName(tagResponse);

    return response.status(201).json({
      status: 'success',
      message: 'story successfully created',
      result: storyResponse
    });
  },

  /**
   * @function getStoryById
   * @description controller for getting a story by id
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} callback that executes the controller
   */
  getStoryById: async (request, response) => {
    const { id } = request.params;
    let storyResponse = await Story.findOne({
      where: {
        Id: id,
      },
      include: [
        {
          model: StoryCategories,
          as: 'categories',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: User,
          as: 'authors',
          attributes: {
            exclude: [
              'password',
              'verifyToken',
              'expireVerifyToken',
              'createdAt',
              'updatedAt',
            ],
          },
        },
      ],
    });
    if (!storyResponse) throw new ApplicationError(404, 'story not found');

    const { dataValues } = storyResponse;
    const tags = dataValues.category.map((eachTag) => eachTag.categoryId);
    const tagName = await getTagName(tags);
    const { category, author, ...newStoryResponse } = storyResponse.dataValues;

    storyResponse = {
      ...newStoryResponse,
      tags: tagName,
      author,
    };

    return response.status(200).json({
      status: 'success',
      message: 'story successfully retrieved',
      result: storyResponse,
    });
  },

  /**
   * @function getStoryBySlug
   * @description controller for getting a story by slug
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} callback that executes the controller
   */
  getStoryBySlug: async (request, response) => {
    const { slug } = request.params;
    let storyResponse = await Story.findOne({
      where: {
        slug: { [Sequelize.Op.iLike]: slug },
      },
      include: [
        {
          model: StoryCategories,
          as: 'category',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: User,
          as: 'author',
          attributes: {
            exclude: [
              'password',
              'verifyToken',
              'expireVerifyToken',
              'createdAt',
              'updatedAt',
            ],
          },
        },
      ],
    });
    if (!storyResponse) throw new ApplicationError(404, 'story not found');

    const { dataValues } = storyResponse;
    const tags = dataValues.category.map((eachTag) => eachTag.categoryId);
    const tagName = await getTagName(tags);
    const { category, author, ...newStoryResponse } = storyResponse.dataValues;

    storyResponse = {
      ...newStoryResponse,
      tags: tagName,
      author,
    };

    return response.status(200).json({
      status: 'success',
      message: 'story successfully retrieved',
      result: storyResponse,
    });
  },

  /**
   * @function editStory
   * @description controller for editing a story
   *
   * @todo check model, middleware and controller✅
   * @todo add more validation
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} callback that executes the controller
   */
  editStory: async (request, response) => {
    const { tag } = request.body;
    const {
      storyId, authorId, slug, id, ...story
    } = request.body;

    const storyResponse = await Story.updateStory(request.storyInstance, story);
    let tagName = [];
    // if (tag) {
    //   await StoryCategories.deleteTags(storyResponse.id);
    //   const tagResponse = await StoryCategories.createTags(
    //     tag, storyResponse.id, request.user.id,
    //   );
    //   tagName = await getTagName(tagResponse);
    // } else {
    //   const value = await StoryCategories.findTags(storyResponse.id);
    //   const createdTags = value.map((eachTag) => eachTag.dataValues.categoryId);
    //   tagName = await getTagName(createdTags);
    // }

    return response.status(200).json({
      status: 'success',
      message: 'story successfully updated',
      result: { ...storyResponse.dataValues, tags: tagName },
    });
  },
};
