"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url:
          "https://a0.muscache.com/im/pictures/miso/Hosting-53274539/original/1c0f22ac-4df7-4463-a915-c66bab72eaf0.jpeg?im_w=1440&im_q=highq",
        preview: true
      },
      {
        spotId: 2,
        url:
          "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49369642/original/82ac8275-16a2-4fa3-b4b6-b805351be431.jpeg?im_w=1440",
          preview: true
      },
      {
        spotId: 3,
        url:
          "https://a0.muscache.com/im/pictures/miso/Hosting-851950480167538672/original/8143acd6-0207-42ee-a500-71f084a73cab.jpeg?im_w=1200",
          preview: true
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await queryInterface.bulkDelete(options, {
      spotId: [1, 2, 3], // Add conditions here if needed
    });
  },
};
