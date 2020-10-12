const { Model } = require('sequelize');
const { Sequelize } = require('sequelize');
const { StoryChannel, StoryStatus } = require('./enums');

module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: 'AuthorStory',
        foreignKey: 'authorId',
        otherKey: 'storiyId',
      });

      this.hasMany(models.StorySection, {
        foreignKey: 'storyId',
      });

      this.belongsToMany(models.Category, {
        as: 'categories',
        through: 'StoryCategory',
        foreignKey: 'categoryId',
        otherKey: 'storyId',
      });
    }
  }

  Story.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    channel: {
      type: DataTypes.ENUM(Object.values(StoryChannel)),
      allowNull: false,
      defaultValue: StoryChannel.Blog,
    },
    type: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      // unique: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    subTitle: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    // authors: {
    //   type: Sequelize.ARRAY(DataTypes.UUID),
    // },
    // guestAuthor: {
    //   type: Sequelize.ARRAY(DataTypes.STRING),
    // },
    bannerImageUrl: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('bannerImageUrl') || 'https://placeholder.com/350';
      },
    },
    status: {
      type: DataTypes.ENUM(Object.values(StoryStatus)),
      allowNull: false,
      defaultValue: StoryStatus.Open,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Story',
  });

  Story.findOneStory = async (slug, options = {}) => {
    const story = await Story.findOne({
      where: { slug: { [Sequelize.Op.iLike]: slug }, ...options },
    });
    return story;
  };

  Story.updateStory = async (storyInstance, story) => {
    story = await storyInstance.update(story, { returning: true });
    return story;
  };

  // /**
  //  * @function createTags
  //  * @description creates tags for a given story
  //  *
  //  * @param {Object} tag tags to be created
  //  * @param {UUID} id id of the story to which tags belong
  //  * @param {UUID} authorId id of the author
  //  *
  //  * @returns {Array} array of tags
  //  */
  // Story.createTags = async (tag, id, authorId) => {
  //   const tags = tag.map((eachTag) => ({
  //     storyId: id,
  //     categoryId: eachTag,
  //     authorId,
  //   }));
  //   const response = await Story.bulkCreate(tags);
  //   const tagsCreated = response.map((eachTag) => eachTag.dataValues.categoryId);

  //   return tagsCreated;
  // };

  // /**
  //  * @function findTags
  //  * @description find all tags belonging to a story
  //  *
  //  * @param {UUID} storyId id of the story to which tags belong
  //  *
  //  * @returns {Array} array of tags
  //  */
  // Story.findTags = async (storyId) => {
  //   const tags = await Story.findAll({ where: { storyId } });
  //   return tags;
  // };

  /**
   * @function deleteTags
   * @description destroys all tags for given story
   *
   * @param {UUID} id id of the story to which tags belong
   *
   * @returns {Void} returns nothing
   */
  Story.deleteTags = async (id) => {
    await Story.destroy({
      returning: true,
      where: { storyId: id },
    });
  };

  return Story;
};
