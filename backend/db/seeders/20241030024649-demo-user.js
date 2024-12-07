"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          firstName: "Demo",
          lastName: "lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "JohnDavid@user.io",
          username: "JohnDavid",
          firstName: "John",
          lastName: "David",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "simpson@user.io",
          username: "sampleuser",
          firstName: "simpson",
          lastName: "user",
          hashedPassword: bcrypt.hashSync("password3"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
