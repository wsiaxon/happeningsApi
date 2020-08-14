const { ENUM } = require("sequelize/types");

const ReportType = {
  COMMENT: "COMMENT"
}

const Channel = {
  BLOG: "BLOG",
  TV: "TV",
  RADIO: "RADIO"
}

const StorySectionType = {
  TEXT: "TEXT",
  IMAGE: "IMAGE"
}

module.exports = { ReportType, Channel, StorySectionType };