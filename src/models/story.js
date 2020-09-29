const { Model } = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'authorId',
        as: 'author',
        onDelete: 'CASCADE',
      });

      this.hasMany(models.StoryCategories, {
        foreignKey: 'storyId',
        as: 'category',
        onDelete: 'CASCADE',
      });

      this.belongsToMany(models.Category, {
        as: 'categories',
        through: 'StoryCategories',
        foreignKey: 'storyId',
        otherKey: 'categoryId',
        onDelete: 'CASCADE',
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
      type: DataTypes.ENUM('BLOG', 'TV', 'RADIO'),
      allowNull: false,
      defaultValue: 'BLOG',
    },
    type: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
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
    authorId: {
      type: DataTypes.STRING,
    },
    guestAuthor: {
      type: DataTypes.STRING,
    },
    bannerImageId: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('bannerImageId') || 'https://placeholder.com/350';
      },
    },
    status: {
      type: DataTypes.ENUM('draft', 'scheduled', 'pending', 'approved', 'rejected'),
      defaultValue: 'draft',
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

  Story.updateArticle = async (storyInstance, story) => {
    story = await storyInstance.update(story, { returning: true });
    return story;
  };

  return Story;
};
