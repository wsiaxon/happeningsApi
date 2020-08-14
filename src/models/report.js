const { ReportType } = require("./enums");


module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define(
    'Report',
    {
      reportType: {
        type: DataTypes.STRING,
        defaultValue: ReportType.COMMENT
      },
      userId: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    },
  );
  Report.associate = function (models) {
    // associations can be defined here
  };
  return Report;
};
