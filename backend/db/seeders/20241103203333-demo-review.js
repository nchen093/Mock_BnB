"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        comment: "This spot is awesome!",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        comment: "It was great, but need some improvment",
        stars: 4,
      },
      {
        spotId: 3,
        userId: 3,
        comment: "This spot is amazing",
        stars: 5,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    await queryInterface.bulkDelete(
      options,
      {
        spotId: [1, 2, 3],
      },
      {}
    );
  },
};
