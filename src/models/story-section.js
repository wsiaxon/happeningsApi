const { StorySectionType } = require("./enums");

module.exports = (sequelize, DataTypes) => {
  const StorySection = sequelize.define(
    'StorySection',
    {
      position: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      storyId: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: StorySectionType.TEXT
      },
    },
  );
  StorySection.associate = function (models) {
    // associations can be defined here
  };
  return StorySection;
};
