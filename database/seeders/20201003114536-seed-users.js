const { Gender } = require("../../src/models/enums");
const User = require("../../src/models/user");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      id: 1,
      name: "Sunrise Eze",
      bio: "Call me Super Admin!",
      gender: Gender.Male,
      email: "ezesunrise@gmail.com",
      password: await bcrypt.hash("123.Qwe", +process.env.SALT_ROUNDS),
      isAdmin: true,
      isEmailVerified: true,
      username: "ezesunrise",
      isLockedOut: false,
      failedCount: 0,
      isActive: true,
      createdAt: new Date(),
    }
  ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
