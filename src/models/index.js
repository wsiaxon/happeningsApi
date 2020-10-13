const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/sequelize');
const { getPermissions } = require('./enums');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV.trim() || 'development';
const config = dbConfig[env];
const db = {};

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(-3) === '.js'))
  .forEach(async (file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    // if (process.env.NODE_ENV !== "production") {
    //   try {
    //     await model.sync({ alter: true });
    //     console.log("AFTER SYNCHING!!!", model.name)
    //   }
    //   catch (e) {
    //     console.log("Error:", model.name)
    //   }
    // }
    
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
