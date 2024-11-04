"use strict";

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: new Date("2023-11-04T12:00:00Z"),
        endDate: new Date("2023-11-10T12:00:00Z"),
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date("2023-09-15T12:00:00Z"),
        endDate: new Date("2024-09-20T12:00:00Z"),
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date("2023-12-01T12:00:00Z"),
        endDate: new Date("2023-12-05T12:00:00Z"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    await queryInterface.bulkDelete(
      options,
      {
        spotId: [1, 2, 3], // Add conditions here if needed
      },
      {}
    );
  },
};
