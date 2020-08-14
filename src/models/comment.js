

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      storyId: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      parentId: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
  );
  Comment.associate = function (models) {
    // associations can be defined here
  };
  return Comment;
};
