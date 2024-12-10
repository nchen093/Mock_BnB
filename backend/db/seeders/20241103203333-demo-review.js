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
        userId: 3,
        comment: "This spot is awesome!",
        stars: 5.0,
      },
      {
        spotId: 2,
        userId: 1,
        comment: "It was great, but need some improvment",
        stars: 4.5,
      },
      {
        spotId: 3,
        userId: 2,
        comment: "Couldn't ask for a better spot!",
        stars: 5.0,
      },
      {
        spotId: 4,
        userId: 1,
        comment: "A great experience overall. Would come back for sure.",
        stars: 4.5,
      },
      {
        spotId: 5,
        userId: 2,
        comment:
          "Amazing place! Everything was just right, would recommend it.",
        stars: 4.78,
      },
      {
        spotId: 6,
        userId: 3,
        comment:
          "The best experience I’ve had in a long time! Highly recommend this place to everyone!",
        stars: 5.0,
      },
      {
        spotId: 7,
        userId: 4,
        comment: "This spot is amazing",
        stars: 4.88,
      },
      {
        spotId: 8,
        userId: 4,
        comment: "This spot is amazing",
        stars: 4.88,
      },
      {
        spotId: 9,
        userId: 2,
        comment: "One of the best spots I've been to!",
        stars: 4.88,
      },
      {
        spotId: 10,
        userId: 1,
        comment: "What an incredible spot!",
        stars: 4.88,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    await queryInterface.bulkDelete(
      options,
      {
        spotId: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      {}
    );
  },
};
