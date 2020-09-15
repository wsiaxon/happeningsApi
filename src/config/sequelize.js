const { config } = require('dotenv');

config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT,
    logging: false,
  },
  test: {
    url: process.env.DATABASE_TEST_URL,
    dialect: process.env.DATABASE_DIALECT,
  },
  staging: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT,
  },
};
