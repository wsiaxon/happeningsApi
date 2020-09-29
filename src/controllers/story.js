const { Sequelize } = require('sequelize');
const { v4: uuid } = require('uuid');
const { ApplicationError } = require('../helpers/error');
const models = require('../models');
const { slugify, getTagName } = require('../helpers/utils');

const { User, Story, StoryCategories } = models;

module.exports = {
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
    const { tag } = request.body;
    const story = {
      ...request.body,
      id: uuid(),
      authorId: request.user.id,
    };
    story.slug = slugify(`${request.body.title} ${story.id}`);

    const storyResponse = await Story.create(story);
    const tagResponse = tag
      ? await StoryCategories.createTags(tag, storyResponse.id, request.user.id)
      : [];
    const tagName = await getTagName(tagResponse);

    return response.status(201).json({
      status: 'success',
      message: 'story successfully created',
      data: { storyResponse, tags: tagName },
    });
  },

  /**
   * @function getAllArticles
   * @description controller for retrieving a story based on the status
   * of the story. Default is to retrieve all articles. Status includes:
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
    const { status } = request.query;
    let articles;

    if (!status) articles = await Story.findAll();
    else articles = await Story.findAll({ where: { status } });

    const message = articles.length
      ? `stor${articles.length > 1 ? 'ies' : 'y'} successfully retrieved`
      : 'no stories found in the database';

    return response.status(200).json({
      status: 'success',
      message,
      data: articles,
    });
  },

  /**
   * @function createStory
   * @description controller for getting an article by slug
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
      data: storyResponse,
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

    const storyResponse = await Story.updateArticle(request.storyInstance, story);
    let tagName = [];
    if (tag) {
      await StoryCategories.deleteTags(storyResponse.id);
      const tagResponse = await StoryCategories.createTags(
        tag, storyResponse.id, request.user.id,
      );
      tagName = await getTagName(tagResponse);
    } else {
      const value = await StoryCategories.findTags(storyResponse.id);
      const createdTags = value.map((eachTag) => eachTag.dataValues.categoryId);
      tagName = await getTagName(createdTags);
    }

    return response.status(200).json({
      status: 'success',
      message: 'story successfully updated',
      data: { ...storyResponse.dataValues, tags: tagName },
    });
  },
};
