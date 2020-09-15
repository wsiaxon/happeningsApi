const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StoryCategories extends Model {
    static associate(models) {
      this.belongsTo(models.Story, {
        as: 'story',
        foreignKey: 'storyId',
        onDelete: 'CASCADE',
      });

      this.belongsTo(models.Category, {
        as: 'tag',
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
      });

      this.belongsTo(models.User, {
        foreignKey: 'authorId',
        as: 'author',
        onDelete: 'CASCADE',
      });
    }
  }

  StoryCategories.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    storyId: DataTypes.UUID,
    categoryId: DataTypes.UUID,
    authorId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'StoryCategories',
  });

  /**
   * @function createTags
   * @description creates tags for a given story
   *
   * @param {Object} tag tags to be created
   * @param {UUID} id id of the story to which tags belong
   * @param {UUID} authorId id of the author
   *
   * @returns {Array} array of tags
   */
  StoryCategories.createTags = async (tag, id, authorId) => {
    const tags = tag.map((eachTag) => ({
      storyId: id,
      categoryId: eachTag,
      authorId,
    }));
    const response = await StoryCategories.bulkCreate(tags);
    const tagsCreated = response.map((eachTag) => eachTag.dataValues.categoryId);

    return tagsCreated;
  };

  /**
   * @function findTags
   * @description find all tags belonging to a story
   *
   * @param {UUID} storyId id of the story to which tags belong
   *
   * @returns {Array} array of tags
   */
  StoryCategories.findTags = async (storyId) => {
    const tags = await StoryCategories.findAll({ where: { storyId } });
    return tags;
  };

  /**
   * @function deleteTags
   * @description destroys all tags for given story
   *
   * @param {UUID} id id of the story to which tags belong
   *
   * @returns {Void} returns nothing
   */
  StoryCategories.deleteTags = async (id) => {
    await StoryCategories.destroy({
      returning: true,
      where: { storyId: id },
    });
  };

  return StoryCategories;
};
